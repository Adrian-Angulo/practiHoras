import { Perfil } from '../../../profile/domain/entities/profile.entity.js';
import { CrearRegistroDTO, RegistroHora } from '../../../registros/domain/entities/registro-hora.entity.js';

export interface BatchSyncPayload {
  perfil?: Partial<Perfil>;
  registros?: {
    creados?: CrearRegistroDTO[];
    actualizados?: (Partial<CrearRegistroDTO> & { id: string })[];
    eliminadosIds?: string[];
  };
}

export interface BatchSyncResult {
  exito: boolean;
  registrosInsertados: number;
  registrosActualizados: number;
  registrosEliminados: number;
  perfilActualizado: boolean;
  perfil: Perfil;
  registros: RegistroHora[];
}
