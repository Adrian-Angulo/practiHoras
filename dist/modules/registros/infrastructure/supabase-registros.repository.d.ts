import { ActualizarRegistroDTO, CrearRegistroDTO, FiltrosRegistrosDTO, RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
export declare class SupabaseRegistrosRepository implements IRegistrosRepository {
    private get client();
    private mapRowToEntity;
    crear(userId: string, data: CrearRegistroDTO): Promise<RegistroHora>;
    listar(userId: string, filtros?: FiltrosRegistrosDTO): Promise<RegistroHora[]>;
    obtenerPorId(userId: string, id: string): Promise<RegistroHora | null>;
    actualizar(userId: string, id: string, data: ActualizarRegistroDTO): Promise<RegistroHora>;
    eliminar(userId: string, id: string): Promise<boolean>;
}
