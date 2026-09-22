export interface DiaHorario {
    activo: boolean;
    horaInicio: string;
    horaFin: string;
    descuentoAlmuerzoMinutos: number;
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
    fechaInicio: string;
    fechaFin: string;
    metaHoras: number;
    horarioSemanal?: HorarioSemanal;
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
