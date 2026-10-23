-- CAPROO database schema
-- Este esquema define la estructura base para alumnos, cursos, grupos, pagos y asistencia.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  phone text,
  role text not null check (role in ('admin', 'professor', 'student')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  modality text not null default 'presencial',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  price numeric(12,2) not null default 0,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_groups (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  name text not null,
  start_date date not null,
  end_date date not null,
  schedule text not null,
  classroom text,
  max_capacity integer not null check (max_capacity > 0),
  professor_id uuid references public.profiles(id),
  price numeric(12,2) not null default 0,
  status text not null default 'active' check (status in ('active', 'paused', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.course_groups(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'reserved', 'confirmed', 'cancelled', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, student_id)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  provider text not null default 'mercadopago',
  provider_payment_id text,
  amount numeric(12,2) not null,
  currency text not null default 'MXN',
  status text not null default 'pending' check (status in ('pending', 'paid', 'rejected', 'cancelled', 'refunded')),
  reference_code text not null,
  webhook_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (reference_code)
);

create table if not exists public.class_sessions (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.course_groups(id) on delete cascade,
  session_date date not null,
  start_time time not null,
  end_time time,
  title text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.class_sessions(id) on delete cascade,
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  status text not null default 'present' check (status in ('present', 'late', 'absent', 'excused')),
  comments text,
  recorded_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (session_id, enrollment_id)
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id uuid,
  action text not null,
  actor_id uuid references public.profiles(id),
  payload jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_groups enable row level security;
alter table public.enrollments enable row level security;
alter table public.payments enable row level security;
alter table public.class_sessions enable row level security;
alter table public.attendance enable row level security;
alter table public.audit_log enable row level security;

create policy "Usuarios pueden ver su propio perfil"
on public.profiles for select
using (auth.uid() = id);

create policy "Administradores completan perfiles"
on public.profiles for insert
with check (auth.role() = 'authenticated');

create policy "Administradores gestionan cursos"
on public.courses for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Profesores ven sus grupos"
on public.course_groups for select
using (
  auth.uid() = professor_id
  or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Alumnos ven sus inscripciones"
on public.enrollments for select
using (
  auth.uid() = student_id
  or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Administradores gestionan pagos"
on public.payments for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Profesores registran asistencia"
on public.attendance for insert
with check (
  exists (
    select 1
    from public.class_sessions cs
    join public.course_groups cg on cg.id = cs.group_id
    where cs.id = session_id and cg.professor_id = auth.uid()
  )
  or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Alumnos ven su propio historial de asistencia"
on public.attendance for select
using (
  exists (
    select 1
    from public.enrollments e
    where e.id = enrollment_id and e.student_id = auth.uid()
  )
  or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);

create function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_profiles
before update on public.profiles
for each row execute function public.update_updated_at_column();

create trigger set_updated_at_courses
before update on public.courses
for each row execute function public.update_updated_at_column();

create trigger set_updated_at_enrollments
before update on public.enrollments
for each row execute function public.update_updated_at_column();

create trigger set_updated_at_payments
before update on public.payments
for each row execute function public.update_updated_at_column();
