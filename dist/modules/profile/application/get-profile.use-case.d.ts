import { Perfil } from '../domain/entities/profile.entity.js';
import { IProfileRepository } from '../domain/repositories/profile.repository.js';
export declare class GetProfileUseCase {
    private readonly profileRepository;
    constructor(profileRepository: IProfileRepository);
    execute(userId: string): Promise<Perfil>;
}
