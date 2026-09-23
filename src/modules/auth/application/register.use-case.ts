import {
  IAuthRepository,
  RegisterDTO,
} from '../domain/repositories/auth.repository.js';
import { UserSession } from '../domain/entities/auth-user.entity.js';
import { AuthBusinessRules } from '../domain/business-rules.js';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(dto: RegisterDTO): Promise<UserSession> {
    // 1. Aplicar reglas de negocio
    AuthBusinessRules.validatePassword(dto.password);

    if (dto.fechaInicio && dto.fechaFin) {
      AuthBusinessRules.validateConvenioDates(dto.fechaInicio, dto.fechaFin);
    }

    const meta = dto.metaHorasTotal ?? dto.metaHoras ?? 360;
    AuthBusinessRules.validateMetaHoras(meta);

    // 2. Persistir en el repositorio
    return await this.authRepository.register({
      ...dto,
      metaHorasTotal: meta,
      metaHoras: meta,
    });
  }
}
