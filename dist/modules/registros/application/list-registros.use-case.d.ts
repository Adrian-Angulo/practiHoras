import { FiltrosRegistrosDTO, RegistroHora } from '../domain/entities/registro-hora.entity.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
export declare class ListRegistrosUseCase {
    private readonly registrosRepo;
    constructor(registrosRepo: IRegistrosRepository);
    execute(userId: string, filtros?: FiltrosRegistrosDTO): Promise<RegistroHora[]>;
}
