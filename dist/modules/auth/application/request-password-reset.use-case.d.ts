import { IAuthRepository } from '../domain/repositories/auth.repository.js';
export declare class RequestPasswordResetUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(email: string, ipAddress?: string): Promise<{
        token: string;
        expiraEn: Date;
    }>;
}
