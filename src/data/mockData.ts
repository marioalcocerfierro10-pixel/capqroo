import type { Course, Faq, Metric, PolicyItem, ScheduleEntry } from '../types';

export const courses: Course[] = [
  {
    id: 'c-medicina-01',
    title: 'Curso propedéutico general',
    summary: 'Preparación integral para fortalecer habilidades académicas y razonamiento.',
    modality: 'Presencial',
    startDate: '10 de enero 2026',
    schedule: 'Lunes a viernes, 18:00 - 21:00 hrs.',
    duration: '12 semanas',
    priceLabel: 'Precio por confirmar',
    availableSeats: 18,
    totalSeats: 30,
    status: 'Abierto',
  },
  {
    id: 'c-medicina-02',
    title: 'Curso de física y química',
    summary: 'Enfoque práctico para reforzar temas clave y resolver ejercicios con método.',
    modality: 'Presencial',
    startDate: '15 de enero 2026',
    schedule: 'Martes y jueves, 17:30 - 20:30 hrs.',
    duration: '10 semanas',
    priceLabel: 'Precio por confirmar',
    availableSeats: 12,
    totalSeats: 24,
    status: 'Abierto',
  },
  {
    id: 'c-medicina-03',
    title: 'Curso intensivo de examen',
    summary: 'Preparación enfocada en simulacros, análisis de reactivos y estrategia.',
    modality: 'Presencial',
    startDate: '2 de febrero 2026',
    schedule: 'Sábado, 09:00 - 14:00 hrs.',
    duration: '8 semanas',
    priceLabel: 'Precio por confirmar',
    availableSeats: 10,
    totalSeats: 20,
    status: 'Próximo',
  },
];

export const metrics: Record<'admin' | 'professor' | 'student', Metric[]> = {
  admin: [
    { label: 'Cursos activos', value: '04', helper: 'publicados' },
    { label: 'Grupos', value: '12', helper: 'con cupo y horario' },
    { label: 'Inscripciones', value: '86', helper: 'en este mes' },
    { label: 'Pagos', value: 'MXN 79,400', helper: 'pendiente de conciliación' },
  ],
  professor: [
    { label: 'Grupos asignados', value: '03', helper: 'vigentes' },
    { label: 'Asistencia', value: '94%', helper: 'promedio' },
    { label: 'Faltas registradas', value: '08', helper: 'últimos 15 días' },
    { label: 'Alumnos', value: '46', helper: 'bajo su supervisión' },
  ],
  student: [
    { label: 'Inscripción', value: 'Activa', helper: 'grupo confirmada' },
    { label: 'Pago', value: 'Pagado', helper: 'referencia validada' },
    { label: 'Asistencia', value: '92%', helper: 'registrada' },
    { label: 'Próxima clase', value: 'Martes', helper: '18:00 hrs.' },
  ],
};

export const roleDescriptions = {
  admin: 'El administrador puede gestionar cursos, grupos, pagos, listas y reportes con control por permisos y trazabilidad.',
  professor: 'El profesor sólo accede a los grupos asignados y puede registrar asistencia, faltas y observaciones.',
  student: 'El alumno consulta cursos disponibles, inscripciones activas y su propio historial académico y de pagos.',
};

export const professorSummary = {
  title: 'Acompañamiento académico',
  text: 'Consulta de horarios, listas de alumnos y registros de asistencia para cada grupo.',
};

export const studentSummary = {
  title: 'Información personal',
  text: 'Plataforma personal para revisar cursos, pagos y próximos encuentros presenciales.',
};

export const professorSchedule: ScheduleEntry[] = [
  { day: 'Lunes', time: '18:00 - 21:00', group: 'Grupo A - Propedéutico' },
  { day: 'Miércoles', time: '17:30 - 20:30', group: 'Grupo B - Física' },
  { day: 'Sábado', time: '09:00 - 14:00', group: 'Intensivo de examen' },
];

export const paymentPolicies: PolicyItem[] = [
  {
    title: 'Reserva de cupo',
    text: 'Se puede reservar un lugar al generar la solicitud de inscripción, con plazo máximo de pago por confirmar según la política operativa.',
  },
  {
    title: 'Validación del precio',
    text: 'El monto final debe verificarse en el servidor y contrastarse con la base de datos antes de confirmar la inscripción.',
  },
  {
    title: 'Webhook y conciliación',
    text: 'Los pagos deberán registrarse con referencia única y validarse con webhook autenticado para evitar doble confirmación o cobros repetidos.',
  },
];

export const faqs: Faq[] = [
  {
    question: '¿Los cursos son presenciales?',
    answer: 'Sí. La propuesta principal de CAPROO es una academia presencial con horarios y grupos definidos en Chetumal, Quintana Roo.',
  },
  {
    question: '¿Cómo puedo consultar la disponibilidad?',
    answer: 'Los alumnos pueden revisar el catálogo, los cupos y la disponibilidad por grupo desde la plataforma o mediante contacto directo.',
  },
  {
    question: '¿Qué pasa si mi pago falla?',
    answer: 'La inscripción debe quedar en pendiente o cancelada según el flujo de validación, sin generar doble pago ni sobreinscripción.',
  },
  {
    question: '¿Se puede acceder desde celular?',
    answer: 'La interface está diseñada para ser responsive y así facilitar la navegación desde teléfonos móviles.',
  },
];
