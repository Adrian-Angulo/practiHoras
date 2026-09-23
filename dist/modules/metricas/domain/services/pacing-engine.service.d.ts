import { Perfil } from '../../../profile/domain/entities/profile.entity.js';
import { RegistroHora } from '../../../registros/domain/entities/registro-hora.entity.js';
import { MetricasDashboard } from '../entities/metricas-dashboard.entity.js';
export declare class PacingEngineService {
    private static round;
    private static getDayKey;
    static calcularMetricas(perfil: Perfil, registros: RegistroHora[], now?: Date): MetricasDashboard;
}
