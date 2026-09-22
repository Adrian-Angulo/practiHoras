import { IAuthRepository, UpdateProfileDTO } from '../domain/repositories/auth.repository.js';
import { UserProfile } from '../domain/entities/auth-user.entity.js';
export declare class UpdateProfileUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(userId: string, dto: UpdateProfileDTO): Promise<UserProfile>;
}
