import { IAuthRepository, LoginDTO } from '../domain/repositories/auth.repository.js';
import { UserSession } from '../domain/entities/auth-user.entity.js';
export declare class LoginUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(dto: LoginDTO): Promise<UserSession>;
}
