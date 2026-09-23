export type ModalidadTrabajo = 'Presencial' | 'Remoto' | 'Híbrido';
export interface HorarioDia {
    diaSemana: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo' | string;
    activo: boolean;
    horaInicio: string;
    horaFin: string;
    refrigerioMinutos: number;
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
export declare const defaultHorarioSemanal: HorarioSemanal;
export interface UserProfile {
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
    fechaInicio?: string | null;
    fechaFin?: string | null;
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
