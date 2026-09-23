import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/app-error.js';
import { ZodError } from 'zod';
import { ENV } from '../../config/env.config.js';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const timestamp = new Date().toISOString();

  // 1. Errores de validación de Zod
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      campo: e.path.join('.'),
      mensaje: e.message,
    }));

    const firstMsg = err.errors[0]?.message || 'Error de validación en los datos enviados';

    res.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: firstMsg,
      success: false,
      detalles: formattedErrors,
      timestamp,
    });
    return;
  }

  // 2. Errores controlados de dominio / aplicación (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err.code,
      message: err.message,
      success: false,
      timestamp,
    });
    return;
  }

  // 3. Error 500 no controlado
  console.error('🔥 [Unhandled Server Error]:', err);
  res.status(500).json({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Ocurrió un error inesperado en el servidor.',
    success: false,
    timestamp,
    ...(ENV.isDev ? { stack: err.stack } : {}),
  });
};
