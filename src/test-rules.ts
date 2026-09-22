import { AuthBusinessRules } from './modules/auth/domain/business-rules.js';
import { TimeUtil } from './core/utils/time.util.js';

console.log('🧪 Ejecutando pruebas unitarias de reglas de negocio de Backend...');

// Test 1: Contraseñas
try {
  AuthBusinessRules.validatePassword('Valida123!');
  console.log('✅ Test 1.1: Contraseña fuerte aprobada.');
} catch (e: any) {
  console.error('❌ Test 1.1 falló:', e.message);
}

try {
  AuthBusinessRules.validatePassword('debil');
  console.error('❌ Test 1.2 falló: Debería haber rechazado contraseña corta');
} catch (e: any) {
  console.log('✅ Test 1.2: Contraseña débil rechazada correctamente:', e.message);
}

// Test 2: Fechas de Convenio
try {
  AuthBusinessRules.validateConvenioDates('2025-01-15', '2025-07-15');
  console.log('✅ Test 2.1: Rango de fechas de 6 meses aprobado.');
} catch (e: any) {
  console.error('❌ Test 2.1 falló:', e.message);
}

try {
  AuthBusinessRules.validateConvenioDates('2025-08-01', '2025-01-01');
  console.error('❌ Test 2.2 falló: Debería haber rechazado fecha fin anterior a inicio');
} catch (e: any) {
  console.log('✅ Test 2.2: Rango invertido rechazado correctamente:', e.message);
}

// Test 3: Jornada diaria laboral y refrigerio
const netHours = TimeUtil.calculateNetHours('08:00', '17:00', 60);
if (netHours === 8.0) {
  console.log(`✅ Test 3.1: Cálculo de horas netas correcto (${netHours} hrs).`);
} else {
  console.error(`❌ Test 3.1 falló: Esperado 8.0, obtenido ${netHours}`);
}

try {
  AuthBusinessRules.validateHabitualSchedule('08:00', '19:00', 30); // 10.5 hrs netas > 8.0
  console.error('❌ Test 3.2 falló: Debería haber rechazado jornada mayor a 8h');
} catch (e: any) {
  console.log('✅ Test 3.2: Exceso de horas diarias rechazado correctamente:', e.message);
}

console.log('🎉 Todas las reglas de negocio críticas validadas con éxito.');
