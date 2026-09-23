import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../../core/errors/app-error.js';
import { IRegistrosRepository } from '../domain/repositories/registros.repository.js';
import { IProfileRepository } from '../../profile/domain/repositories/profile.repository.js';
import { CreateRegistroUseCase } from '../application/create-registro.use-case.js';
import { ListRegistrosUseCase } from '../application/list-registros.use-case.js';
import { GetRegistroByIdUseCase } from '../application/get-registro-by-id.use-case.js';
import { UpdateRegistroUseCase } from '../application/update-registro.use-case.js';
import { DeleteRegistroUseCase } from '../application/delete-registro.use-case.js';
import { ExportCsvUseCase } from '../application/export-csv.use-case.js';
import {
  ActualizarRegistroInput,
  CrearRegistroInput,
  FiltrosRegistrosInput,
} from '../infrastructure/dtos/registro.schemas.js';

export class RegistrosController {
  private readonly createUseCase: CreateRegistroUseCase;
  private readonly listUseCase: ListRegistrosUseCase;
  private readonly getByIdUseCase: GetRegistroByIdUseCase;
  private readonly updateUseCase: UpdateRegistroUseCase;
  private readonly deleteUseCase: DeleteRegistroUseCase;
  private readonly exportCsvUseCase: ExportCsvUseCase;

  constructor(
    private readonly registrosRepo: IRegistrosRepository,
    private readonly profileRepo: IProfileRepository
  ) {
    this.createUseCase = new CreateRegistroUseCase(registrosRepo);
    this.listUseCase = new ListRegistrosUseCase(registrosRepo);
    this.getByIdUseCase = new GetRegistroByIdUseCase(registrosRepo);
    this.updateUseCase = new UpdateRegistroUseCase(registrosRepo);
    this.deleteUseCase = new DeleteRegistroUseCase(registrosRepo);
    this.exportCsvUseCase = new ExportCsvUseCase(registrosRepo, profileRepo);
  }

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
      const registro = await this.createUseCase.execute(userId, input);

      res.status(201).json(registro);
    } catch (err) {
      next(err);
    }
  };

  listar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const query = req.query as unknown as FiltrosRegistrosInput;
      const registros = await this.listUseCase.execute(userId, query);

      res.status(200).json(registros);
    } catch (err) {
      next(err);
    }
  };

  obtenerPorId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const { id } = req.params;
      const registro = await this.getByIdUseCase.execute(userId, id!);

      res.status(200).json(registro);
    } catch (err) {
      next(err);
    }
  };

  actualizar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const { id } = req.params;
      const input = req.body as ActualizarRegistroInput;
      const actualizado = await this.updateUseCase.execute(userId, id!, input);

      res.status(200).json(actualizado);
    } catch (err) {
      next(err);
    }
  };

  eliminar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const { id } = req.params;
      await this.deleteUseCase.execute(userId, id!);

      res.status(200).json({
        message: 'Registro eliminado con éxito',
      });
    } catch (err) {
      next(err);
    }
  };

  exportarCsv = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const csvContent = await this.exportCsvUseCase.execute(userId);

      const filename = `practihoras-reporte-${new Date().toISOString().split('T')[0]}.csv`;

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.status(200).send(csvContent);
    } catch (err) {
      next(err);
    }
  };
}
