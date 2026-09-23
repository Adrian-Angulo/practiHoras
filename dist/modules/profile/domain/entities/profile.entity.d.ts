export type Modalidad = 'Presencial' | 'Remoto' | 'Híbrido';
export interface HorarioDia {
    diaSemana?: string;
    activo: boolean;
    horaInicio: string;
    horaFin: string;
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
    fechaInicio: string | null;
    fechaFin: string | null;
    horarioSemanal: HorarioSemanal;
    avatarUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare const defaultHorarioSemanal: HorarioSemanal;
