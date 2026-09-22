import { HorarioSemanal, UserProfile, UserSession } from '../entities/auth-user.entity.js';

export interface RegisterDTO {
  email: string;
  password: string;
  nombreCompleto: string;
  carrera?: string;
  semestre?: string;
  fechaInicio: string;
  fechaFin: string;
  metaHoras: number;
  horarioSemanal?: HorarioSemanal;
  horaInicioHabitual?: string;
  horaFinHabitual?: string;
  descuentoAlmuerzoHabitual?: number;
  modalidadHabitual?: 'Presencial' | 'Remoto' | 'Híbrido';
}

export interface LoginDTO {
  email: string;
  password: string;
  ipAddress?: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}

export interface UpdateProfileDTO {
  nombreCompleto?: string;
  carrera?: string;
  semestre?: string;
  fechaInicio?: string;
  fechaFin?: string;
  metaHoras?: number;
  horarioSemanal?: HorarioSemanal;
  horaInicioHabitual?: string;
  horaFinHabitual?: string;
  descuentoAlmuerzoHabitual?: number;
  modalidadHabitual?: 'Presencial' | 'Remoto' | 'Híbrido';
  avatarUrl?: string;
}

export interface IAuthRepository {
  register(data: RegisterDTO): Promise<UserSession>;
  login(data: LoginDTO): Promise<UserSession>;
  requestPasswordReset(email: string, ipAddress?: string): Promise<{ token: string; expiraEn: Date }>;
  resetPassword(data: ResetPasswordDTO): Promise<void>;
  getProfileById(userId: string): Promise<UserProfile | null>;
  getProfileByEmail(email: string): Promise<UserProfile | null>;
  updateProfile(userId: string, data: UpdateProfileDTO): Promise<UserProfile>;
  logout(token: string): Promise<void>;
}
