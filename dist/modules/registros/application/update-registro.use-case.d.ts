import { ActualizarRegistroDTO, RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
export declare class UpdateRegistroUseCase {
    private readonly registrosRepo;
    constructor(registrosRepo: IRegistrosRepository);
    execute(userId: string, id: string, data: ActualizarRegistroDTO): Promise<RegistroHora>;
}
