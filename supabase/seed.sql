-- Seed data example: roles and sample profiles.
-- Reemplazar con los usuarios reales y permisos definidos en Supabase Auth.

insert into public.profiles (id, full_name, email, phone, role)
values
  ('00000000-0000-0000-0000-000000000001', 'Administrador CAPROO', 'admin@capqroo.com.mx', '9990000001', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'Profesor CAPROO', 'profesor@capqroo.com.mx', '9990000002', 'professor'),
  ('00000000-0000-0000-0000-000000000003', 'Alumno ejemplo', 'alumno@capqroo.com.mx', '9990000003', 'student')
on conflict (id) do nothing;
