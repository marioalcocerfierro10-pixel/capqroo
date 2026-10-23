export type Role = 'admin' | 'professor' | 'student';

export type Course = {
  id: string;
  title: string;
  summary: string;
  modality: 'Presencial';
  startDate: string;
  schedule: string;
  duration: string;
  priceLabel: string;
  availableSeats: number;
  totalSeats: number;
  status: 'Abierto' | 'Próximo';
};

export type Metric = {
  label: string;
  value: string;
  helper: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type ScheduleEntry = {
  day: string;
  time: string;
  group: string;
};

export type PolicyItem = {
  title: string;
  text: string;
};
