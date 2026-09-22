import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

export const ENV = {
  PORT: parseInt(process.env['PORT'] || '3000', 10),
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  CLIENT_ORIGIN: process.env['CLIENT_ORIGIN'] || 'http://localhost:4200',

  SUPABASE_URL: process.env['SUPABASE_URL'] || '',
  SUPABASE_ANON_KEY: process.env['SUPABASE_ANON_KEY'] || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env['SUPABASE_SERVICE_ROLE_KEY'] || '',

  // Seguridad & Anti-Fuerza Bruta
  LOGIN_MAX_FAILED_ATTEMPTS: parseInt(process.env['LOGIN_MAX_FAILED_ATTEMPTS'] || '5', 10),
  LOGIN_LOCKOUT_MINUTES: parseInt(process.env['LOGIN_LOCKOUT_MINUTES'] || '15', 10),
  RESET_TOKEN_EXPIRATION_MINUTES: parseInt(process.env['RESET_TOKEN_EXPIRATION_MINUTES'] || '30', 10),

  isDev: (process.env['NODE_ENV'] || 'development') === 'development',
  isProd: process.env['NODE_ENV'] === 'production',
};
