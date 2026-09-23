import { BusinessRuleViolationError } from '../../../core/errors/app-error.js';
import { TimeUtil } from '../../../core/utils/time.util.js';

export class AuthBusinessRules {
  /**
   * REGLA 1: Fortaleza de Contraseña
   * Mínimo 6 caracteres para facilidad de uso en dispositivos móviles y entornos de prácticas.
   */
  static validatePassword(password: string): void {
    if (!password || password.length < 6) {
      throw new BusinessRuleViolationError(
        'La contraseña debe tener al menos 6 caracteres.',
        'PASSWORD_TOO_SHORT'
      );
    }
  }

  /**
   * REGLA 2: Validación de Fechas del Convenio de Prácticas
   * - fechaInicio debe ser anterior a fechaFin
   * - Duración mínima: 30 días
   * - Duración máxima: 730 días (2 años)
   */
  static validateConvenioDates(fechaInicio: string, fechaFin: string): void {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BusinessRuleViolationError(
        'Las fechas del convenio deben tener un formato válido (YYYY-MM-DD).',
        'INVALID_DATE_FORMAT'
      );
    }

    if (start >= end) {
      throw new BusinessRuleViolationError(
        'La fecha de inicio de prácticas debe ser estrictamente anterior a la fecha de fin.',
        'INVALID_CONVENIO_DATE_RANGE'
      );
    }

    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      throw new BusinessRuleViolationError(
        'El periodo de prácticas debe ser de al menos 30 días.',
        'CONVENIO_DURATION_TOO_SHORT'
      );
    }

    if (diffDays > 730) {
      throw new BusinessRuleViolationError(
        'El periodo del convenio no puede superar los 2 años consecutivos.',
        'CONVENIO_DURATION_TOO_LONG'
      );
    }
  }

  /**
   * REGLA 3: Meta de Horas Académicas
   * Límite razonable entre 100 y 1200 horas totales (estándar 360 - 480 horas).
   */
  static validateMetaHoras(metaHoras: number): void {
    if (metaHoras < 100 || metaHoras > 1200) {
      throw new BusinessRuleViolationError(
        'La meta de horas debe ser un valor entre 100 y 1200 horas.',
        'INVALID_META_HORAS'
      );
    }
  }

  /**
   * REGLA 4: Horario y Jornada Laboral Habitual
   * - Hora de inicio anterior a la de fin.
   * - Descuento de almuerzo entre 0 y 180 min.
   * - Límite legal de jornada para practicantes: Máximo 8.0 horas netas diarias (o 30h/48h semanales).
   */
  static validateHabitualSchedule(
    horaInicio: string,
    horaFin: string,
    descuentoAlmuerzoMin = 60
  ): void {
    const startMin = TimeUtil.timeToMinutes(horaInicio);
    const endMin = TimeUtil.timeToMinutes(horaFin);

    if (endMin <= startMin) {
      throw new BusinessRuleViolationError(
        'La hora de inicio habitual debe ser menor que la hora de fin habitual.',
        'INVALID_SCHEDULE_HOURS'
      );
    }

    if (descuentoAlmuerzoMin < 0 || descuentoAlmuerzoMin > 180) {
      throw new BusinessRuleViolationError(
        'El descuento de almuerzo debe estar entre 0 y 180 minutos.',
        'INVALID_LUNCH_DISCOUNT'
      );
    }

    const netHours = TimeUtil.calculateNetHours(horaInicio, horaFin, descuentoAlmuerzoMin);

    if (netHours > 8.0) {
      throw new BusinessRuleViolationError(
        `La jornada habitual calculada (${netHours} hrs netas) excede el límite legal de 8 horas diarias de prácticas pre-profesionales.`,
        'MAX_DAILY_HOURS_EXCEEDED'
      );
    }

    if (netHours <= 0) {
      throw new BusinessRuleViolationError(
        'El horario configurado resulta en 0 horas netas trabajadas.',
        'ZERO_NET_HOURS'
      );
    }
  }
}
