export interface DiaHorario {
  activo: boolean;
  horaInicio: string; // HH:mm
  horaFin: string;    // HH:mm
  descuentoAlmuerzoMinutos: number; // minutos
  modalidad: 'Presencial' | 'Remoto' | 'Híbrido';
}

export interface HorarioSemanal {
  lunes: DiaHorario;
  martes: DiaHorario;
  miercoles: DiaHorario;
  jueves: DiaHorario;
  viernes: DiaHorario;
  sabado: DiaHorario;
  domingo: DiaHorario;
}

export interface UserProfile {
  id: string;
  email: string;
  nombreCompleto: string;
  carrera?: string;
  semestre?: string;
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string;    // YYYY-MM-DD
  metaHoras: number;
  horarioSemanal?: HorarioSemanal;
  // Compatibilidad con campos habituales legacy
  horaInicioHabitual?: string;
  horaFinHabitual?: string;
  descuentoAlmuerzoHabitual?: number;
  modalidadHabitual?: 'Presencial' | 'Remoto' | 'Híbrido';
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSession {
  user: UserProfile;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}
