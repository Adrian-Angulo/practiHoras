import { IAuthRepository } from '../domain/repositories/auth.repository.js';
import { UserProfile } from '../domain/entities/auth-user.entity.js';
export declare class GetCurrentUserUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(userId: string): Promise<UserProfile>;
}
