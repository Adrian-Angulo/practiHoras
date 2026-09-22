import {
  IAuthRepository,
  RegisterDTO,
} from '../domain/repositories/auth.repository.js';
import { UserSession } from '../domain/entities/auth-user.entity.js';
import { AuthBusinessRules } from '../domain/business-rules.js';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(dto: RegisterDTO): Promise<UserSession> {
    // 1. Aplicar reglas de negocio obligatorias
    AuthBusinessRules.validatePassword(dto.password);
    AuthBusinessRules.validateConvenioDates(dto.fechaInicio, dto.fechaFin);
    AuthBusinessRules.validateMetaHoras(dto.metaHoras);

    const horaInicio = dto.horaInicioHabitual || '08:00';
    const horaFin = dto.horaFinHabitual || '17:00';
    const descuento = dto.descuentoAlmuerzoHabitual ?? 60;
    AuthBusinessRules.validateHabitualSchedule(horaInicio, horaFin, descuento);

    // 2. Persistir en el repositorio
    return await this.authRepository.register(dto);
  }
}
