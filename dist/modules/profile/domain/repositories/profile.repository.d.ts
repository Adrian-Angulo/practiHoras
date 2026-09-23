import { Perfil, HorarioSemanal } from '../entities/profile.entity.js';
export interface UpdatePerfilDTO {
    nombre?: string;
    nombreCompleto?: string;
    carrera?: string;
    semestre?: string;
    metaHorasTotal?: number;
    metaHoras?: number;
    horasInicialesPrevias?: number;
    horasMinimasSemanales?: number;
    perfilCompletado?: boolean;
    fechaInicio?: string | null;
    fechaFin?: string | null;
    horarioSemanal?: HorarioSemanal;
    avatarUrl?: string | null;
}
export interface IProfileRepository {
    getProfile(userId: string): Promise<Perfil | null>;
    updateProfile(userId: string, data: UpdatePerfilDTO): Promise<Perfil>;
}
