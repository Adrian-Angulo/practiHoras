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
  // Manejo de errores de validación de Zod
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      campo: e.path.join('.'),
      mensaje: e.message,
    }));

    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Los datos enviados no cumplen con el formato requerido.',
        detalles: formattedErrors,
      },
    });
    return;
  }

  // Manejo de errores controlados de la aplicación (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  // Error 500 no controlado
  console.error('🔥 [Unhandled Server Error]:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error inesperado en el servidor.',
      ...(ENV.isDev ? { stack: err.stack } : {}),
    },
  });
};
