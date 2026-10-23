import { FormEvent, useEffect, useMemo, useState } from 'react';
import { courses, faqs, metrics, paymentPolicies, professorSchedule, roleDescriptions } from './data/mockData';
import { supabase } from './lib/supabase';
import type { Role } from './types';

type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: Role;
};

type AuthMode = 'sign-in' | 'sign-up';

type SessionUser = {
  user: {
    id: string;
    email?: string | null;
  };
};

const roleLabels: Record<Role, string> = {
  admin: 'Administrador',
  professor: 'Profesor',
  student: 'Alumno',
};

const roleOptions: Role[] = ['admin', 'professor', 'student'];

const createDefaultForm = () => ({
  fullName: '',
  email: '',
  password: '',
});

const fetchProfile = async (userId: string, email: string, fullName?: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('id', userId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  if (data) {
    return {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      role: data.role as Role,
    };
  }

  return {
    id: userId,
    email: email || 'usuario@capqroo.com.mx',
    full_name: fullName || 'Usuario CAPROO',
    role: 'student',
  };
};

function App() {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [showPublicPreview, setShowPublicPreview] = useState(false);
  const [form, setForm] = useState(createDefaultForm());
  const [session, setSession] = useState<SessionUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const initializeSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setErrorMessage('No fue posible validar la sesión actual.');
        return;
      }

      const currentSession = data.session;
      if (!currentSession) {
        setSession(null);
        setProfile(null);
        return;
      }

      const nextSession = { user: { id: currentSession.user.id, email: currentSession.user.email } } as SessionUser;
      setSession(nextSession);

      try {
        const nextProfile = await fetchProfile(
          currentSession.user.id,
          currentSession.user.email ?? '',
          currentSession.user.user_metadata?.full_name,
        );
        setProfile(nextProfile);
      } catch (profileError) {
        setErrorMessage('La sesión existe, pero no se pudo cargar el perfil de usuario.');
      }
    };

    initializeSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!nextSession) {
        setSession(null);
        setProfile(null);
        return;
      }

      setSession({ user: { id: nextSession.user.id, email: nextSession.user.email } });

      try {
        const nextProfile = await fetchProfile(
          nextSession.user.id,
          nextSession.user.email ?? '',
          nextSession.user.user_metadata?.full_name,
        );
        setProfile(nextProfile);
      } catch (profileError) {
        setErrorMessage('No fue posible recuperar el perfil del usuario autenticado.');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const ensureProfile = async (userId: string, email: string, fullName: string) => {
    const { error } = await supabase.from('profiles').upsert(
      {
        id: userId,
        email,
        full_name: fullName || 'Usuario CAPROO',
        role: 'student',
      },
      { onConflict: 'id' },
    );

    if (error) {
      throw error;
    }

    return fetchProfile(userId, email, fullName);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setStatusMessage('');

    try {
      if (mode === 'sign-in') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error('No se pudo iniciar sesión.');
        }

        const nextProfile = await fetchProfile(data.user.id, data.user.email ?? form.email, data.user.user_metadata?.full_name);
        setProfile(nextProfile);
        setSession({ user: { id: data.user.id, email: data.user.email } });
        setStatusMessage('Sesión iniciada correctamente.');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}`,
            data: {
              full_name: form.fullName,
            },
          },
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          const createdProfile = await ensureProfile(data.user.id, form.email, form.fullName);
          setProfile(createdProfile);
          setSession({ user: { id: data.user.id, email: data.user.email } });
          setStatusMessage('Usuario registrado. Completa la verificación de correo si tu proyecto lo requiere.');
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setStatusMessage('Sesión cerrada correctamente.');
  };

  const activeRole = profile?.role || selectedRole;

  const roleSummary = useMemo(() => {
    switch (activeRole) {
      case 'admin':
        return { title: 'Panel administrativo', description: roleDescriptions.admin };
      case 'professor':
        return { title: 'Panel docente', description: roleDescriptions.professor };
      default:
        return { title: 'Panel del alumno', description: roleDescriptions.student };
    }
  }, [activeRole]);

  const highlightedMetrics =
    activeRole === 'admin'
      ? metrics.admin
      : activeRole === 'professor'
        ? metrics.professor
        : metrics.student;

  if (showPublicPreview) {
    return <PublicLandingPage onBackToAuth={() => setShowPublicPreview(false)} />;
  }

  if (!session || !profile) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-header">
            <div className="brand-mark">CAPROO</div>
            <div>
              <p className="eyebrow">Acceso seguro</p>
              <h1>Inicia sesión</h1>
            </div>
          </div>

          <div className="auth-toggle">
            <button
              type="button"
              className={mode === 'sign-in' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => setMode('sign-in')}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              className={mode === 'sign-up' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => setMode('sign-up')}
            >
              Crear cuenta
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'sign-up' && (
              <label>
                Nombre completo
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => handleInputChange('fullName', event.target.value)}
                  placeholder="Ej. Ana López"
                  required
                />
              </label>
            )}

            <label>
              Correo electrónico
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
                placeholder="correo@capqroo.com.mx"
                required
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                value={form.password}
                onChange={(event) => handleInputChange('password', event.target.value)}
                placeholder="••••••••"
                minLength={8}
                required
              />
            </label>

            {errorMessage && <div className="message error">{errorMessage}</div>}
            {statusMessage && <div className="message success">{statusMessage}</div>}

            <button className="button primary auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Procesando...' : mode === 'sign-in' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>

          <button className="button secondary preview-button" type="button" onClick={() => setShowPublicPreview(true)}>
            Ver vista pública
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell dashboard-shell">
      <header className="topbar dashboard-topbar">
        <div className="brand-wrap">
          <div className="brand-mark">CAPROO</div>
          <div>
            <div className="brand-name">CAPROO</div>
            <small>Panel {roleLabels[profile.role]}</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navegación del panel">
          <button type="button" className="nav-button">Inicio</button>
          <button type="button" className="nav-button">Cursos</button>
          <button type="button" className="nav-button">Alumnos</button>
          <button type="button" className="nav-button">Pagos</button>
        </nav>

        <div className="topbar-actions">
          <span className="user-chip">{profile.full_name}</span>
          <button className="button secondary small" type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main>
        <section className="section dashboard-section">
          <div className="section-heading">
            <span className="eyebrow">Sistema CAPROO</span>
            <h2>Acceso por rol y permisos</h2>
          </div>

          <div className="role-switcher" role="tablist" aria-label="Selecciona un rol de usuario">
            {roleOptions.map((role) => (
              <button
                key={role}
                type="button"
                className={activeRole === role ? 'role-button active' : 'role-button'}
                onClick={() => setSelectedRole(role)}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>

          <div className="role-overview">
            <div>
              <span className="eyebrow">Perfil autenticado</span>
              <h3>{roleSummary.title}</h3>
              <p>{roleSummary.description}</p>
            </div>
            <div className="role-badge">{roleLabels[profile.role]}</div>
          </div>

          <div className="metrics-grid">
            {highlightedMetrics.map((metric) => (
              <div className="metric-card" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.helper}</small>
              </div>
            ))}
          </div>

          <div className="panel-grid">
            <div className="panel-card">
              <h4>Permisos actuales</h4>
              {activeRole === 'admin' && (
                <ul>
                  <li>Crear cursos y grupos</li>
                  <li>Consultar pagos y reportes</li>
                  <li>Gestionar usuarios y accesos</li>
                </ul>
              )}
              {activeRole === 'professor' && (
                <ul>
                  <li>Ver grupos asignados</li>
                  <li>Registrar asistencia</li>
                  <li>Consultar historial del grupo</li>
                </ul>
              )}
              {activeRole === 'student' && (
                <ul>
                  <li>Consultar cursos disponibles</li>
                  <li>Inscribirse en grupos</li>
                  <li>Revisar historial personal</li>
                </ul>
              )}
            </div>

            <div className="panel-card">
              <h4>Seguridad y esquema</h4>
              <ul>
                <li>Supabase Auth habilitado</li>
                <li>RLS y privilegios mínimos</li>
                <li>Validación del lado del servidor</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PublicLandingPage({ onBackToAuth }: { onBackToAuth: () => void }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">CAPROO</div>
          <div>
            <div className="brand-name">CAPROO</div>
            <small>Innovar &amp; Educar</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#cursos">Cursos</a>
          <a href="#faq">FAQ</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <button type="button" className="button primary" onClick={onBackToAuth}>
          Iniciar sesión
        </button>
      </header>

      <main>
        <section id="inicio" className="hero section">
          <div className="hero-copy">
            <span className="eyebrow">Chetumal, Quintana Roo</span>
            <h1>Preparación presencial para el ingreso a Medicina</h1>
            <p>
              CAPROO ofrece acompañamiento académico, metodología clara y atención cercana para estudiantes que desean fortalecer su camino hacia la universidad.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#cursos">Ver cursos disponibles</a>
              <a className="button secondary" href="https://wa.me/529983117777?text=Hola%20CAPROO%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20cursos." target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>

            <ul className="hero-list">
              <li>Clases presenciales con horario definido</li>
              <li>Grupos con cupo limitado y seguimiento</li>
              <li>Administración segura y trazable</li>
            </ul>
          </div>

          <div className="hero-card">
            <div className="status-pill">Contenido provisional</div>
            <h3>Plataforma CAPROO</h3>
            <p>
              Este MVP representa la base funcional de la plataforma. Se recomienda reemplazar los textos y precios por la información oficial cuando se confirme la oferta académica real.
            </p>

            <div className="mini-stats">
              <div>
                <strong>Grupos</strong>
                <span>5+</span>
              </div>
              <div>
                <strong>Modalidad</strong>
                <span>Presencial</span>
              </div>
              <div>
                <strong>Ubicación</strong>
                <span>Chetumal</span>
              </div>
            </div>
          </div>
        </section>

        <section id="nosotros" className="section">
          <div className="section-heading">
            <span className="eyebrow">Nuestra propuesta</span>
            <h2>Excelencia académica, atención personalizada y disciplina</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <h3>Metodología</h3>
              <p>Enfoque práctico para fortalecer habilidades académicas, tiempos de estudio y hábitos de preparación para el examen de admisión.</p>
            </article>
            <article className="feature-card">
              <h3>Seguimiento</h3>
              <p>Acompañamiento por grupos, asistencia registrada y supervisión del progreso del alumnado durante el ciclo.</p>
            </article>
            <article className="feature-card">
              <h3>Confianza</h3>
              <p>Sistema transparente para inscripción, pagos, asistencias y control administrativo con reglas y permisos por rol.</p>
            </article>
          </div>
        </section>

        <section id="cursos" className="section">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Cursos presenciales</span>
              <h2>Catálogo general</h2>
            </div>
            <div className="note">Precios y horarios sujetos a confirmación oficial.</div>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.id}>
                <div className="course-header">
                  <span className="status-badge">{course.status}</span>
                  <span className="course-tag">{course.modality}</span>
                </div>
                <h3>{course.title}</h3>
                <p className="course-summary">{course.summary}</p>

                <ul className="course-meta">
                  <li><strong>Inicio:</strong> {course.startDate}</li>
                  <li><strong>Horario:</strong> {course.schedule}</li>
                  <li><strong>Duración:</strong> {course.duration}</li>
                  <li><strong>Cupo:</strong> {course.availableSeats}/{course.totalSeats}</li>
                  <li><strong>Precio:</strong> {course.priceLabel}</li>
                </ul>

                <div className="course-actions">
                  <button className="button primary" type="button">Inscribirme</button>
                  <button className="button secondary" type="button">Más información</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section two-column">
          <div>
            <span className="eyebrow">Profesores y seguimiento</span>
            <h2>Organización docente</h2>
            <div className="schedule-card">
              <h4>Horario docente</h4>
              {professorSchedule.map((item) => (
                <div className="schedule-row" key={item.day}>
                  <strong>{item.day}</strong>
                  <span>{item.time}</span>
                  <small>{item.group}</small>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="eyebrow">Administración</span>
            <h2>Procesos de inscripción y cobro</h2>
            <div className="policy-list">
              {paymentPolicies.map((item) => (
                <div key={item.title} className="policy-item">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Preguntas frecuentes</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div className="faq-item" key={faq.question}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="section cta-section">
          <div className="cta-card">
            <div>
              <span className="eyebrow">Contacto</span>
              <h2>Consulta información o inscripción</h2>
            </div>
            <div className="cta-actions">
              <a className="button primary" href="https://wa.me/529983117777?text=Hola%20CAPROO%2C%20me%20interesa%20inscribirme%20a%20un%20curso." target="_blank" rel="noreferrer">
                Enviar WhatsApp
              </a>
              <a className="button secondary" href="mailto:contacto@capqroo.com.mx">Correo de contacto</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>CAPROO</strong>
          <p>Innovar &amp; Educar</p>
        </div>
        <div className="footer-links">
          <a href="#">Aviso de privacidad</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Política de cookies</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
