import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../../core/errors/app-error.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
import { ActualizarRegistroInput, CrearRegistroInput } from '../infrastructure/dtos/registro.schemas.js';

export class RegistrosController {
  constructor(private readonly registrosRepo: IRegistrosRepository) {}

  private getUserId(req: Request): string {
    if (!req.user?.id) {
      throw new UnauthorizedError('Usuario no autenticado');
    }
    return req.user.id;
  }

  crear = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const input = req.body as CrearRegistroInput;
      const registro = await this.registrosRepo.crear(userId, input);

      res.status(201).json({
        success: true,
        message: 'Jornada registrada exitosamente en Supabase',
        data: registro,
      });
    } catch (err) {
      next(err);
    }
  };

  listar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const limite = req.query.limite ? parseInt(req.query.limite as string, 10) : undefined;
      const registros = await this.registrosRepo.listar(userId, limite);

      res.status(200).json({
        success: true,
        data: registros,
      });
    } catch (err) {
      next(err);
    }
  };

  obtenerPorId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const { id } = req.params;
      const registro = await this.registrosRepo.obtenerPorId(userId, id);

      if (!registro) {
        res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Registro no encontrado' },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: registro,
      });
    } catch (err) {
      next(err);
    }
  };

  actualizar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const { id } = req.params;
      const input = req.body as ActualizarRegistroInput;
      const actualizado = await this.registrosRepo.actualizar(userId, id, input);

      res.status(200).json({
        success: true,
        message: 'Jornada actualizada exitosamente',
        data: actualizado,
      });
    } catch (err) {
      next(err);
    }
  };

  eliminar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const { id } = req.params;
      await this.registrosRepo.eliminar(userId, id);

      res.status(200).json({
        success: true,
        message: 'Jornada eliminada exitosamente',
      });
    } catch (err) {
      next(err);
    }
  };

  obtenerKpis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const kpis = await this.registrosRepo.obtenerKpis(userId);

      res.status(200).json({
        success: true,
        data: kpis,
      });
    } catch (err) {
      next(err);
    }
  };

  obtenerRendimientoSemanal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const rendimiento = await this.registrosRepo.obtenerRendimientoSemanal(userId);

      res.status(200).json({
        success: true,
        data: rendimiento,
      });
    } catch (err) {
      next(err);
    }
  };
}
