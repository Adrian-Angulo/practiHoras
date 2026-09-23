import { PacingEngineService } from './modules/metricas/domain/services/pacing-engine.service.js';
import { RegistroCalculoService } from './modules/registros/domain/services/registro-calculo.service.js';
import { Perfil, defaultHorarioSemanal } from './modules/profile/domain/entities/profile.entity.js';
import { RegistroHora } from './modules/registros/domain/entities/registro-hora.entity.js';

console.log('🚀 [TESTS]: Verificando compatibilidad total Backend con FrontendMovil...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName} ${detail ? `-> ${detail}` : ''}`);
  }
}

// -----------------------------------------------------------------------------
// TEST SUITE 1: RegistroCalculoService (Horas Netas Computables)
// -----------------------------------------------------------------------------
console.log('--- Test Suite 1: Cálculo de Horas Netas Computables ---');

const h1 = RegistroCalculoService.calcularHorasComputables('08:00', '13:00', 0);
assert(h1 === 5.0, '08:00 a 13:00 sin almuerzo = 5.0 hrs', `Obtenido: ${h1}`);

const h2 = RegistroCalculoService.calcularHorasComputables('08:00', '17:00', 60);
assert(h2 === 8.0, '08:00 a 17:00 con 60 min almuerzo = 8.0 hrs', `Obtenido: ${h2}`);

const h3 = RegistroCalculoService.calcularHorasComputables('09:30', '13:45', 15);
assert(h3 === 4.0, '09:30 a 13:45 con 15 min descuento = 4.0 hrs', `Obtenido: ${h3}`);

try {
  RegistroCalculoService.calcularHorasComputables('14:00', '12:00', 0);
  assert(false, 'Debería fallar cuando horaInicio >= horaFin');
} catch {
  assert(true, 'Rechaza correctamente inicio mayor a fin');
}

// -----------------------------------------------------------------------------
// TEST SUITE 2: PacingEngineService (Motor de Ritmo)
// -----------------------------------------------------------------------------
console.log('\n--- Test Suite 2: Motor de Ritmo y Cumplimiento (Pacing Engine) ---');

const mockProfile: Perfil = {
  id: 'test-user-123',
  email: 'practicante@uni.edu.pe',
  nombre: 'Juan Pérez',
  metaHorasTotal: 360.0,
  horasInicialesPrevias: 40.0,
  horasMinimasSemanales: 30.0,
  perfilCompletado: true,
  fechaInicio: '2026-03-01',
  fechaFin: '2026-06-30',
  horarioSemanal: defaultHorarioSemanal,
};

const mockRegistros: RegistroHora[] = [
  {
    id: 'reg-1',
    userId: 'test-user-123',
    fecha: '2026-03-02',
    horaInicio: '08:00',
    horaFin: '13:00',
    descuentoAlmuerzoMinutos: 0,
    horasComputables: 5.0,
    modalidad: 'Presencial',
    actividades: 'Desarrollo de pantallas',
    estado: 'Aprobado',
    createdAt: '2026-03-02T13:00:00Z',
    updatedAt: '2026-03-02T13:00:00Z',
  },
  {
    id: 'reg-2',
    userId: 'test-user-123',
    fecha: '2026-03-03',
    horaInicio: '14:00',
    horaFin: '19:00',
    descuentoAlmuerzoMinutos: 0,
    horasComputables: 5.0,
    modalidad: 'Presencial',
    actividades: 'Testing unitario',
    estado: 'Aprobado',
    createdAt: '2026-03-03T19:00:00Z',
    updatedAt: '2026-03-03T19:00:00Z',
  },
];

// Test con fecha simulada '2026-03-04'
const simulatedNow = new Date(2026, 2, 4); // 4 de Marzo de 2026
const metricas = PacingEngineService.calcularMetricas(mockProfile, mockRegistros, simulatedNow);

assert(metricas.horasPreviasCursadas === 40.0, 'Horas previas = 40.0');
assert(metricas.horasRegistradasEnApp === 10.0, 'Horas registradas en app = 10.0');
assert(metricas.horasTotalesCompletadas === 50.0, 'Horas totales completadas = 50.0');
assert(metricas.horasRestantes === 310.0, 'Horas restantes = 310.0');
assert(metricas.totalDiasTrabajados === 2, 'Total días trabajados = 2');
assert(metricas.promedioHorasPorDia === 5.0, 'Promedio horas por día = 5.0');
assert(typeof metricas.estadoRitmo === 'string', `Estado de ritmo válido: ${metricas.estadoRitmo}`);
assert(typeof metricas.mensajeRitmo === 'string' && metricas.mensajeRitmo.length > 0, 'Mensaje de ritmo presente');
assert(metricas.diasHabilesRestantes > 0, `Días hábiles restantes calculados: ${metricas.diasHabilesRestantes}`);

// Test sin fechas configuradas
const profileSinFechas: Perfil = {
  ...mockProfile,
  fechaInicio: null,
  fechaFin: null,
};
const metricasSinFechas = PacingEngineService.calcularMetricas(profileSinFechas, mockRegistros, simulatedNow);
assert(metricasSinFechas.estadoRitmo === 'sin_fechas', 'Estado es sin_fechas cuando no hay fechas');

// -----------------------------------------------------------------------------
// RESULTADOS
// -----------------------------------------------------------------------------
console.log(`\n======================================================`);
console.log(`📊 Pruebas Completadas: ${passedTests}/${totalTests} superadas.`);
if (passedTests === totalTests) {
  console.log(`🎉 ¡TODOS LOS TESTS DE COMPATIBILIDAD CON FRONTENDMOVIL PASARON EXITOSAMENTE!`);
} else {
  console.error(`⚠️ Hubo fallos en la suite de pruebas.`);
  process.exit(1);
}
console.log(`======================================================\n`);
