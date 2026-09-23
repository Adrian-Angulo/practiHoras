import { Perfil } from '../domain/entities/profile.entity.js';
import { IProfileRepository, UpdatePerfilDTO } from '../domain/repositories/profile.repository.js';
export declare class SupabaseProfileRepository implements IProfileRepository {
    private get client();
    private mapRowToEntity;
    getProfile(userId: string): Promise<Perfil | null>;
    updateProfile(userId: string, data: UpdatePerfilDTO): Promise<Perfil>;
}
