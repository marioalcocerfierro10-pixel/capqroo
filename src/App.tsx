import { useMemo, useState } from 'react';
import {
  courses,
  faqs,
  metrics,
  paymentPolicies,
  professorSchedule,
  professorSummary,
  roleDescriptions,
  studentSummary,
} from './data/mockData';
import type { Role } from './types';

const roles: Role[] = ['admin', 'professor', 'student'];

function App() {
  const [selectedRole, setSelectedRole] = useState<Role>('admin');

  const roleSummary = useMemo(() => {
    switch (selectedRole) {
      case 'admin':
        return { title: 'Panel administrativo', description: roleDescriptions.admin };
      case 'professor':
        return { title: 'Panel docente', description: roleDescriptions.professor };
      default:
        return { title: 'Panel del alumno', description: roleDescriptions.student };
    }
  }, [selectedRole]);

  const highlightedMetrics =
    selectedRole === 'admin'
      ? metrics.admin
      : selectedRole === 'professor'
        ? metrics.professor
        : metrics.student;

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

        <a className="button primary" href="#contacto">
          Consultar información
        </a>
      </header>

      <main>
        <section id="inicio" className="hero section">
          <div className="hero-copy">
            <span className="eyebrow">Chetumal, Quintana Roo</span>
            <h1>Preparación presencial para el ingreso a Medicina</h1>
            <p>
              CAPROO ofrece acompañamiento académico, metodología clara y atención
              cercana para estudiantes que desean fortalecer su camino hacia la
              universidad.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#cursos">
                Ver cursos disponibles
              </a>
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
              Este MVP representa la base funcional de la plataforma. Se recomienda
              reemplazar los textos y precios por la información oficial cuando se
              confirme la oferta académica real.
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
              <p>
                Enfoque práctico para fortalecer habilidades académicas, tiempos de
                estudio y hábitos de preparación para el examen de admisión.
              </p>
            </article>
            <article className="feature-card">
              <h3>Seguimiento</h3>
              <p>
                Acompañamiento por grupos, asistencia registrada y supervisión del
                progreso del alumnado durante el ciclo.
              </p>
            </article>
            <article className="feature-card">
              <h3>Confianza</h3>
              <p>
                Sistema transparente para inscripción, pagos, asistencias y control
                administrativo con reglas y permisos por rol.
              </p>
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
                  <li>
                    <strong>Inicio:</strong> {course.startDate}
                  </li>
                  <li>
                    <strong>Horario:</strong> {course.schedule}
                  </li>
                  <li>
                    <strong>Duración:</strong> {course.duration}
                  </li>
                  <li>
                    <strong>Cupo:</strong> {course.availableSeats}/{course.totalSeats}
                  </li>
                  <li>
                    <strong>Precio:</strong> {course.priceLabel}
                  </li>
                </ul>

                <div className="course-actions">
                  <button className="button primary">Inscribirme</button>
                  <button className="button secondary">Más información</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section dashboard-section">
          <div className="section-heading">
            <span className="eyebrow">Acceso por rol</span>
            <h2>Permisos y operaciones del sistema</h2>
          </div>

          <div className="role-switcher" role="tablist" aria-label="Selecciona un rol de usuario">
            {roles.map((role) => (
              <button
                key={role}
                className={selectedRole === role ? 'role-button active' : 'role-button'}
                type="button"
                onClick={() => setSelectedRole(role)}
              >
                {role === 'admin' ? 'Administrador' : role === 'professor' ? 'Profesor' : 'Alumno'}
              </button>
            ))}
          </div>

          <div className="role-overview">
            <div>
              <span className="eyebrow">Vista seleccionada</span>
              <h3>{roleSummary.title}</h3>
              <p>{roleSummary.description}</p>
            </div>

            <div className="role-dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
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
              <h4>Permisos principales</h4>
              <ul>
                {selectedRole === 'admin' && (
                  <>
                    <li>Crear, editar y publicar cursos.</li>
                    <li>Gestionar grupos, cupos y horarios.</li>
                    <li>Control de pagos y reportes.</li>
                  </>
                )}
                {selectedRole === 'professor' && (
                  <>
                    <li>Ver solo sus grupos asignados.</li>
                    <li>Registrar asistencia y faltas.</li>
                    <li>Consultar historiales de sus alumnos.</li>
                  </>
                )}
                {selectedRole === 'student' && (
                  <>
                    <li>Consultar cursos y grupos disponibles.</li>
                    <li>Inscribirse y revisar pago.</li>
                    <li>Consultar su historial personal.</li>
                  </>
                )}
              </ul>
            </div>

            <div className="panel-card">
              <h4>Datos de sesión</h4>
              {selectedRole === 'admin' ? (
                <ul>
                  <li>RLS en Supabase habilitado</li>
                  <li>Roles con privilegios mínimos</li>
                  <li>Registro de auditoría</li>
                </ul>
              ) : selectedRole === 'professor' ? (
                <ul>
                  <li>Vista filtrada por grupo</li>
                  <li>Asistencia y retardos</li>
                  <li>Licencia docente centralizada</li>
                </ul>
              ) : (
                <ul>
                  <li>Inscripción y pago con referencia</li>
                  <li>Historial personal visible</li>
                  <li>Perfil editable autorizado</li>
                </ul>
              )}
            </div>
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
              <a className="button secondary" href="mailto:contacto@capqroo.com.mx">
                Correo de contacto
              </a>
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
