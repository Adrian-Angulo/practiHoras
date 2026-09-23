import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
export declare class ExportCsvUseCase {
    private readonly registrosRepo;
    private readonly profileRepo;
    constructor(registrosRepo: IRegistrosRepository, profileRepo: IProfileRepository);
    execute(userId: string): Promise<string>;
}
