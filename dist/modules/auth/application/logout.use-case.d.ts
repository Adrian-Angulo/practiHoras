import { IAuthRepository } from '../domain/repositories/auth.repository.js';
export declare class LogoutUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(token: string): Promise<void>;
}
