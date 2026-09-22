import { IAuthRepository, ResetPasswordDTO } from '../domain/repositories/auth.repository.js';
export declare class ResetPasswordUseCase {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    execute(dto: ResetPasswordDTO): Promise<void>;
}
