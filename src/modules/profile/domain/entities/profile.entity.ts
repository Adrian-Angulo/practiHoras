export type Modalidad = 'Presencial' | 'Remoto' | 'Híbrido';

export interface HorarioDia {
  diaSemana?: string;
  activo: boolean;
  horaInicio: string; // HH:mm
  horaFin: string;    // HH:mm
  refrigerioMinutos: number;
  modalidad: Modalidad;
}

export type HorarioSemanal = Record<string, HorarioDia>;

export interface Perfil {
  id: string;
  email: string;
  nombre: string;
  nombreCompleto?: string;
  carrera?: string;
  semestre?: string;
  metaHorasTotal: number;
  metaHoras?: number;
  horasInicialesPrevias: number;
  horasMinimasSemanales: number;
  perfilCompletado: boolean;
  fechaInicio: string | null; // YYYY-MM-DD
  fechaFin: string | null;    // YYYY-MM-DD
  horarioSemanal: HorarioSemanal;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultHorarioSemanal: HorarioSemanal = {
  lunes: {
    diaSemana: 'lunes',
    activo: true,
    horaInicio: '08:00',
    horaFin: '13:00',
    refrigerioMinutos: 0,
    modalidad: 'Presencial',
  },
  martes: {
    diaSemana: 'martes',
    activo: true,
    horaInicio: '14:00',
    horaFin: '19:00',
    refrigerioMinutos: 0,
    modalidad: 'Presencial',
  },
  miercoles: {
    diaSemana: 'miercoles',
    activo: true,
    horaInicio: '14:00',
    horaFin: '19:00',
    refrigerioMinutos: 0,
    modalidad: 'Presencial',
  },
  jueves: {
    diaSemana: 'jueves',
    activo: true,
    horaInicio: '08:00',
    horaFin: '13:00',
    refrigerioMinutos: 0,
    modalidad: 'Presencial',
  },
  viernes: {
    diaSemana: 'viernes',
    activo: true,
    horaInicio: '08:00',
    horaFin: '13:00',
    refrigerioMinutos: 0,
    modalidad: 'Presencial',
  },
  sabado: {
    diaSemana: 'sabado',
    activo: false,
    horaInicio: '08:00',
    horaFin: '13:00',
    refrigerioMinutos: 0,
    modalidad: 'Presencial',
  },
  domingo: {
    diaSemana: 'domingo',
    activo: false,
    horaInicio: '08:00',
    horaFin: '13:00',
    refrigerioMinutos: 0,
    modalidad: 'Presencial',
  },
};
