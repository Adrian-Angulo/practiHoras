import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
export declare class DeleteRegistroUseCase {
    private readonly registrosRepo;
    constructor(registrosRepo: IRegistrosRepository);
    execute(userId: string, id: string): Promise<boolean>;
}
