import {
  ActualizarRegistroDTO,
  CrearRegistroDTO,
  FiltrosRegistrosDTO,
  RegistroHora,
} from '../entities/registro-hora.entity.js';

export interface IRegistrosRepository {
  crear(userId: string, data: CrearRegistroDTO): Promise<RegistroHora>;
  listar(userId: string, filtros?: FiltrosRegistrosDTO): Promise<RegistroHora[]>;
  obtenerPorId(userId: string, id: string): Promise<RegistroHora | null>;
  actualizar(userId: string, id: string, data: ActualizarRegistroDTO): Promise<RegistroHora>;
  eliminar(userId: string, id: string): Promise<boolean>;
}
