import {
  IAuthRepository,
  UpdateProfileDTO,
} from '../domain/repositories/auth.repository.js';
import { UserProfile } from '../domain/entities/auth-user.entity.js';
import { AuthBusinessRules } from '../domain/business-rules.js';

export class UpdateProfileUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(userId: string, dto: UpdateProfileDTO): Promise<UserProfile> {
    if (dto.fechaInicio && dto.fechaFin) {
      AuthBusinessRules.validateConvenioDates(dto.fechaInicio, dto.fechaFin);
    }
    const meta = dto.metaHorasTotal ?? dto.metaHoras;
    if (meta !== undefined) {
      AuthBusinessRules.validateMetaHoras(meta);
    }

    return await this.authRepository.updateProfile(userId, {
      ...dto,
      metaHorasTotal: meta,
      metaHoras: meta,
    });
  }
}
