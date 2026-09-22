import { ActualizarRegistroDTO, CrearRegistroDTO, RegistroHora, RendimientoSemanal, ResumenKpis } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
export declare class SupabaseRegistrosRepository implements IRegistrosRepository {
    private get client();
    private calcularHorasComputables;
    private mapRowToEntity;
    crear(userId: string, data: CrearRegistroDTO): Promise<RegistroHora>;
    listar(userId: string, limite?: number): Promise<RegistroHora[]>;
    obtenerPorId(userId: string, id: string): Promise<RegistroHora | null>;
    actualizar(userId: string, id: string, data: ActualizarRegistroDTO): Promise<RegistroHora>;
    eliminar(userId: string, id: string): Promise<boolean>;
    obtenerKpis(userId: string): Promise<ResumenKpis>;
    obtenerRendimientoSemanal(userId: string): Promise<RendimientoSemanal>;
}
