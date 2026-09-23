export type ModalidadTrabajo = 'Presencial' | 'Remoto' | 'Híbrido';

export interface HorarioDia {
  diaSemana: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo' | string;
  activo: boolean;
  horaInicio: string; // HH:mm
  horaFin: string;    // HH:mm
  refrigerioMinutos: number; // minutos de descuento
  modalidad: ModalidadTrabajo;
}

export type HorarioSemanal = {
  lunes: HorarioDia;
  martes: HorarioDia;
  miercoles: HorarioDia;
  jueves: HorarioDia;
  viernes: HorarioDia;
  sabado: HorarioDia;
  domingo: HorarioDia;
};

export const defaultHorarioSemanal: HorarioSemanal = {
  lunes: { diaSemana: 'lunes', activo: true, horaInicio: '08:00', horaFin: '13:00', refrigerioMinutos: 0, modalidad: 'Presencial' },
  martes: { diaSemana: 'martes', activo: true, horaInicio: '14:00', horaFin: '19:00', refrigerioMinutos: 0, modalidad: 'Presencial' },
  miercoles: { diaSemana: 'miercoles', activo: true, horaInicio: '14:00', horaFin: '19:00', refrigerioMinutos: 0, modalidad: 'Presencial' },
  jueves: { diaSemana: 'jueves', activo: true, horaInicio: '08:00', horaFin: '13:00', refrigerioMinutos: 0, modalidad: 'Presencial' },
  viernes: { diaSemana: 'viernes', activo: true, horaInicio: '08:00', horaFin: '13:00', refrigerioMinutos: 0, modalidad: 'Presencial' },
  sabado: { diaSemana: 'sabado', activo: false, horaInicio: '08:00', horaFin: '13:00', refrigerioMinutos: 0, modalidad: 'Presencial' },
  domingo: { diaSemana: 'domingo', activo: false, horaInicio: '08:00', horaFin: '13:00', refrigerioMinutos: 0, modalidad: 'Presencial' },
};

export interface UserProfile {
  id: string;
  email: string;
  nombre: string;
  nombreCompleto?: string; // Para compatibilidad
  carrera?: string;
  semestre?: string;
  metaHorasTotal: number;
  metaHoras?: number; // Compatibilidad
  horasInicialesPrevias: number;
  horasMinimasSemanales: number;
  perfilCompletado: boolean;
  fechaInicio?: string | null; // YYYY-MM-DD
  fechaFin?: string | null;    // YYYY-MM-DD
  horarioSemanal: HorarioSemanal;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSession {
  user: UserProfile;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}
