export type Modalidad = 'Presencial' | 'Remoto' | 'Híbrido';
export type EstadoRegistro = 'Borrador' | 'Pendiente' | 'Aprobado' | 'Observado';

export interface RegistroHora {
  id: string;
  userId: string;
  fecha: string; // YYYY-MM-DD
  horaInicio: string; // HH:mm
  horaFin: string; // HH:mm
  descuentoAlmuerzoMinutos: number;
  horasComputables: number;
  modalidad: Modalidad;
  actividades: string;
  supervisorNombre?: string | null;
  estado?: EstadoRegistro;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CrearRegistroDTO {
  id?: string; // Soportar UUID provisto por el cliente en modo Offline-First
  fecha: string;
  horaInicio: string;
  horaFin: string;
  descuentoAlmuerzoMinutos?: number;
  refrigerioMinutos?: number; // Alias para compatibilidad
  horasComputables?: number;
  modalidad: Modalidad;
  actividades: string;
  supervisorNombre?: string | null;
  estado?: EstadoRegistro;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActualizarRegistroDTO {
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
  descuentoAlmuerzoMinutos?: number;
  refrigerioMinutos?: number;
  horasComputables?: number;
  modalidad?: Modalidad;
  actividades?: string;
  supervisorNombre?: string | null;
  estado?: EstadoRegistro;
  updatedAt?: string;
}

export interface FiltrosRegistrosDTO {
  mes?: number;
  anio?: number;
  modalidad?: Modalidad;
  desde?: string; // YYYY-MM-DD
  hasta?: string; // YYYY-MM-DD
  limite?: number;
}
