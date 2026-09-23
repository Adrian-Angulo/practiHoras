import { Request, Response, NextFunction } from 'express';
import { IProfileRepository } from '../domain/repositories/profile.repository.js';
export declare class ProfileController {
    private readonly getProfileUseCase;
    private readonly updateProfileUseCase;
    constructor(profileRepo: IProfileRepository);
    private getUserId;
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
