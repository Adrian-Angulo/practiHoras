import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../../core/errors/app-error.js';
import { GetProfileUseCase } from '../application/get-profile.use-case.js';
import { UpdateProfileUseCase } from '../application/update-profile.use-case.js';
import { IProfileRepository, UpdatePerfilDTO } from '../domain/repositories/profile.repository.js';
import { UpdateProfileInput } from '../infrastructure/dtos/profile.schemas.js';

export class ProfileController {
  private readonly getProfileUseCase: GetProfileUseCase;
  private readonly updateProfileUseCase: UpdateProfileUseCase;

  constructor(profileRepo: IProfileRepository) {
    this.getProfileUseCase = new GetProfileUseCase(profileRepo);
    this.updateProfileUseCase = new UpdateProfileUseCase(profileRepo);
  }

  private getUserId(req: Request): string {
    if (!req.user?.id) {
      throw new UnauthorizedError('Usuario no autenticado.');
    }
    return req.user.id;
  }

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const profile = await this.getProfileUseCase.execute(userId);

      // Retornar entidad directa conforme a la especificación FrontendMovil
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const input = req.body as UpdateProfileInput;
      const updated = await this.updateProfileUseCase.execute(userId, input as unknown as UpdatePerfilDTO);

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };
}
