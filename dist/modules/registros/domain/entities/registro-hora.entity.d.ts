export type Modalidad = 'Presencial' | 'Remoto' | 'Híbrido';
export type EstadoRegistro = 'Borrador' | 'Pendiente' | 'Aprobado' | 'Observado';
export interface RegistroHora {
    id: string;
    userId: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    descuentoAlmuerzoMinutos: number;
    horasComputables: number;
    modalidad: Modalidad;
    actividades: string;
    supervisorNombre?: string | null;
    estado: EstadoRegistro;
    createdAt: string;
    updatedAt: string;
}
export interface CrearRegistroDTO {
    fecha: string;
    horaInicio: string;
    horaFin: string;
    descuentoAlmuerzoMinutos: number;
    modalidad: Modalidad;
    actividades: string;
    supervisorNombre?: string | null;
}
export interface ActualizarRegistroDTO {
    fecha?: string;
    horaInicio?: string;
    horaFin?: string;
    descuentoAlmuerzoMinutos?: number;
    modalidad?: Modalidad;
    actividades?: string;
    supervisorNombre?: string | null;
}
export interface ResumenKpis {
    horasAcumuladas: number;
    horasObjetivo: number;
    porcentajeAvance: number;
    jornadasCompletadas: number;
    promedioHorasDiarias: number;
    diasRestantesEstimados: number;
}
export interface DiaRendimiento {
    fecha: string;
    diaNombre: string;
    horasRegistradas: number;
    modalidad: Modalidad;
    horasMetaDia: number;
}
export interface RendimientoSemanal {
    semanaEtiqueta: string;
    totalHorasSemana: number;
    dias: DiaRendimiento[];
}
