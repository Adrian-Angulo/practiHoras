import { Perfil } from '../domain/entities/profile.entity.js';
import { IProfileRepository, UpdatePerfilDTO } from '../domain/repositories/profile.repository.js';
export declare class UpdateProfileUseCase {
    private readonly profileRepository;
    constructor(profileRepository: IProfileRepository);
    execute(userId: string, data: UpdatePerfilDTO): Promise<Perfil>;
}
