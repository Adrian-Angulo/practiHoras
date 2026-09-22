import { IAuthRepository, RegisterDTO } from '../domain/repositories/auth.repository.js';
import { UserSession } from '../domain/entities/auth-user.entity.js';
export declare class RegisterUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(dto: RegisterDTO): Promise<UserSession>;
}
