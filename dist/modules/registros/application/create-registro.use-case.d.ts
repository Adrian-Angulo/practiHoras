import { CrearRegistroDTO, RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
export declare class CreateRegistroUseCase {
    private readonly registrosRepo;
    constructor(registrosRepo: IRegistrosRepository);
    execute(userId: string, data: CrearRegistroDTO): Promise<RegistroHora>;
}
