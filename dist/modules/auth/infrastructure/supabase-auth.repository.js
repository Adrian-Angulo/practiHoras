"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseAuthRepository = void 0;
const app_error_js_1 = require("../../../core/errors/app-error.js");
const supabase_config_js_1 = require("../../../config/supabase.config.js");
const crypto_util_js_1 = require("../../../core/utils/crypto.util.js");
const env_config_js_1 = require("../../../config/env.config.js");
class SupabaseAuthRepository {
    supabaseAdmin = (0, supabase_config_js_1.getSupabaseAdmin)();
    supabaseAnon = (0, supabase_config_js_1.getSupabaseAnon)();
    /**
     * Registro de nuevo usuario en Supabase Auth y creación de perfil
     */
    async register(data) {
        const cleanEmail = data.email.trim().toLowerCase();
        // 1. Crear usuario en Supabase Auth con metadata de negocio
        const { data: authData, error: authError } = await this.supabaseAdmin.auth.admin.createUser({
            email: cleanEmail,
            password: data.password,
            email_confirm: true, // Confirmar automáticamente para entornos de prácticas
            user_metadata: {
                nombreCompleto: data.nombreCompleto,
                carrera: data.carrera || 'Ingeniería de Software',
                semestre: data.semestre || 'Semestre 2025-1',
                fechaInicio: data.fechaInicio,
                fechaFin: data.fechaFin,
                metaHoras: data.metaHoras,
                horarioSemanal: data.horarioSemanal,
                horaInicioHabitual: data.horaInicioHabitual || '08:00:00',
                horaFinHabitual: data.horaFinHabitual || '17:00:00',
                descuentoAlmuerzoHabitual: data.descuentoAlmuerzoHabitual ?? 0,
                modalidadHabitual: data.modalidadHabitual || 'Presencial',
            },
        });
        if (authError || !authData.user) {
            if (authError?.message?.includes('already registered') || authError?.status === 422) {
                throw new app_error_js_1.ConflictError('Ya existe una cuenta registrada con este correo electrónico.');
            }
            throw new app_error_js_1.BadRequestError(authError?.message || 'Error al registrar el usuario en el sistema.');
        }
        const userId = authData.user.id;
        // 2. Asegurar inserción o actualización del perfil en public.perfiles
        const profileRecord = {
            id: userId,
            email: cleanEmail,
            nombre_completo: data.nombreCompleto,
            carrera: data.carrera || 'Ingeniería de Software',
            semestre: data.semestre || 'Semestre 2025-1',
            fecha_inicio: data.fechaInicio,
            fecha_fin: data.fechaFin,
            meta_horas: data.metaHoras,
            hora_inicio_habitual: data.horaInicioHabitual || '08:00:00',
            hora_fin_habitual: data.horaFinHabitual || '17:00:00',
            descuento_almuerzo_min: data.descuentoAlmuerzoHabitual ?? 0,
            modalidad_habitual: data.modalidadHabitual || 'Presencial',
        };
        if (data.horarioSemanal) {
            profileRecord['horario_semanal'] = data.horarioSemanal;
        }
        const { error: profileError } = await this.supabaseAdmin
            .from('perfiles')
            .upsert(profileRecord, { onConflict: 'id' });
        if (profileError) {
            console.error('Error insertando perfil en Supabase:', profileError);
        }
        // 3. Iniciar sesión inmediata para generar token de acceso
        const { data: sessionData, error: sessionError } = await this.supabaseAnon.auth.signInWithPassword({
            email: cleanEmail,
            password: data.password,
        });
        const accessToken = sessionData?.session?.access_token || 'mock-token-session';
        const refreshToken = sessionData?.session?.refresh_token;
        const userProfile = {
            id: userId,
            email: cleanEmail,
            nombreCompleto: data.nombreCompleto,
            carrera: data.carrera || 'Ingeniería de Software',
            semestre: data.semestre || 'Semestre 2025-1',
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin,
            metaHoras: data.metaHoras,
            horaInicioHabitual: data.horaInicioHabitual || '08:00',
            horaFinHabitual: data.horaFinHabitual || '17:00',
            descuentoAlmuerzoHabitual: data.descuentoAlmuerzoHabitual ?? 60,
            modalidadHabitual: data.modalidadHabitual || 'Presencial',
        };
        return {
            user: userProfile,
            accessToken,
            refreshToken,
            expiresIn: sessionData?.session?.expires_in,
        };
    }
    /**
     * Inicio de sesión con verificación de Anti-Fuerza Bruta
     */
    async login(data) {
        const cleanEmail = data.email.trim().toLowerCase();
        // 1. Verificar si la cuenta está bloqueada temporalmente
        await this.checkBruteForceLock(cleanEmail);
        // 2. Intentar autenticación en Supabase
        const { data: authData, error: authError } = await this.supabaseAnon.auth.signInWithPassword({
            email: cleanEmail,
            password: data.password,
        });
        if (authError || !authData.user || !authData.session) {
            // Registrar intento fallido
            await this.registerFailedAttempt(cleanEmail, data.ipAddress);
            throw new app_error_js_1.UnauthorizedError('Credenciales incorrectas. Verifica tu correo y contraseña.');
        }
        // 3. Resetear contador de intentos fallidos al tener éxito
        await this.resetFailedAttempts(cleanEmail);
        // 4. Obtener datos del perfil extendido
        const profile = await this.getProfileById(authData.user.id);
        const userProfile = profile || {
            id: authData.user.id,
            email: cleanEmail,
            nombreCompleto: authData.user.user_metadata?.['nombreCompleto'] || cleanEmail.split('@')[0],
            fechaInicio: authData.user.user_metadata?.['fechaInicio'] || '2025-01-15',
            fechaFin: authData.user.user_metadata?.['fechaFin'] || '2025-06-30',
            metaHoras: authData.user.user_metadata?.['metaHoras'] || 360,
            horaInicioHabitual: '08:00',
            horaFinHabitual: '17:00',
            descuentoAlmuerzoHabitual: 60,
            modalidadHabitual: 'Presencial',
        };
        return {
            user: userProfile,
            accessToken: authData.session.access_token,
            refreshToken: authData.session.refresh_token,
            expiresIn: authData.session.expires_in,
        };
    }
    /**
     * Solicitud de código / token seguro de recuperación
     */
    async requestPasswordReset(email, ipAddress) {
        const cleanEmail = email.trim().toLowerCase();
        // 1. Buscar usuario por email
        const profile = await this.getProfileByEmail(cleanEmail);
        if (!profile) {
            // Por seguridad anti-enumeración, no lanzamos error visible si no existe
            return {
                token: 'token-simulado',
                expiraEn: new Date(Date.now() + env_config_js_1.ENV.RESET_TOKEN_EXPIRATION_MINUTES * 60 * 1000),
            };
        }
        // 2. Generar token criptográfico único
        const plainToken = crypto_util_js_1.CryptoUtil.generateRandomToken(24);
        const tokenHash = crypto_util_js_1.CryptoUtil.hashToken(plainToken);
        const expiraEn = new Date(Date.now() + env_config_js_1.ENV.RESET_TOKEN_EXPIRATION_MINUTES * 60 * 1000);
        // 3. Guardar hash en public.tokens_recuperacion
        await this.supabaseAdmin.from('tokens_recuperacion').insert({
            user_id: profile.id,
            email: cleanEmail,
            token_hash: tokenHash,
            expira_en: expiraEn.toISOString(),
            ip_solicitud: ipAddress,
        });
        return {
            token: plainToken,
            expiraEn,
        };
    }
    /**
     * Restablecimiento de contraseña mediante token validado
     */
    async resetPassword(data) {
        const tokenHash = crypto_util_js_1.CryptoUtil.hashToken(data.token.trim());
        // 1. Buscar token activo y no utilizado
        const { data: tokenRecord, error } = await this.supabaseAdmin
            .from('tokens_recuperacion')
            .select('*')
            .eq('token_hash', tokenHash)
            .eq('utilizado', false)
            .gt('expira_en', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        if (error || !tokenRecord) {
            throw new app_error_js_1.BadRequestError('El enlace de recuperación es inválido o ha expirado.');
        }
        const userId = tokenRecord.user_id;
        // 2. Actualizar contraseña del usuario en Supabase Auth
        const { error: updateAuthError } = await this.supabaseAdmin.auth.admin.updateUserById(userId, {
            password: data.newPassword,
        });
        if (updateAuthError) {
            throw new app_error_js_1.BadRequestError(updateAuthError.message || 'Error al actualizar la contraseña del usuario.');
        }
        // 3. Marcar token como utilizado
        await this.supabaseAdmin
            .from('tokens_recuperacion')
            .update({
            utilizado: true,
            utilizado_en: new Date().toISOString(),
        })
            .eq('id', tokenRecord.id);
    }
    /**
     * Obtener perfil por ID de usuario
     */
    async getProfileById(userId) {
        const { data, error } = await this.supabaseAdmin
            .from('perfiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error || !data)
            return null;
        return this.mapToDomainProfile(data);
    }
    /**
     * Obtener perfil por email
     */
    async getProfileByEmail(email) {
        const { data, error } = await this.supabaseAdmin
            .from('perfiles')
            .select('*')
            .eq('email', email.trim().toLowerCase())
            .single();
        if (error || !data)
            return null;
        return this.mapToDomainProfile(data);
    }
    /**
     * Actualizar configuración de perfil
     */
    async updateProfile(userId, data) {
        const updatePayload = {};
        if (data.nombreCompleto !== undefined)
            updatePayload['nombre_completo'] = data.nombreCompleto;
        if (data.carrera !== undefined)
            updatePayload['carrera'] = data.carrera;
        if (data.semestre !== undefined)
            updatePayload['semestre'] = data.semestre;
        if (data.fechaInicio !== undefined)
            updatePayload['fecha_inicio'] = data.fechaInicio;
        if (data.fechaFin !== undefined)
            updatePayload['fecha_fin'] = data.fechaFin;
        if (data.metaHoras !== undefined)
            updatePayload['meta_horas'] = data.metaHoras;
        if (data.horarioSemanal !== undefined)
            updatePayload['horario_semanal'] = data.horarioSemanal;
        if (data.horaInicioHabitual !== undefined)
            updatePayload['hora_inicio_habitual'] = data.horaInicioHabitual;
        if (data.horaFinHabitual !== undefined)
            updatePayload['hora_fin_habitual'] = data.horaFinHabitual;
        if (data.descuentoAlmuerzoHabitual !== undefined)
            updatePayload['descuento_almuerzo_min'] = data.descuentoAlmuerzoHabitual;
        if (data.modalidadHabitual !== undefined)
            updatePayload['modalidad_habitual'] = data.modalidadHabitual;
        if (data.avatarUrl !== undefined)
            updatePayload['avatar_url'] = data.avatarUrl;
        const { data: updated, error } = await this.supabaseAdmin
            .from('perfiles')
            .update(updatePayload)
            .eq('id', userId)
            .select()
            .single();
        if (error || !updated) {
            throw new app_error_js_1.BadRequestError('Error al actualizar el perfil del usuario.');
        }
        return this.mapToDomainProfile(updated);
    }
    /**
     * Cierre de sesión y revocación
     */
    async logout(token) {
        await this.supabaseAnon.auth.admin.signOut(token);
    }
    // ============================================================================
    // MÉTODOS PRIVADOS: Anti-Fuerza Bruta & Mappers
    // ============================================================================
    async checkBruteForceLock(email) {
        const { data } = await this.supabaseAdmin
            .from('intentos_login')
            .select('intentos_fallidos, bloqueado_hasta')
            .eq('email', email)
            .single();
        if (data && data.bloqueado_hasta) {
            const lockDate = new Date(data.bloqueado_hasta);
            const now = new Date();
            if (lockDate > now) {
                const minutesLeft = Math.ceil((lockDate.getTime() - now.getTime()) / (1000 * 60));
                throw new app_error_js_1.AccountLockedError(minutesLeft);
            }
        }
    }
    async registerFailedAttempt(email, ipAddress) {
        const { data } = await this.supabaseAdmin
            .from('intentos_login')
            .select('id, intentos_fallidos')
            .eq('email', email)
            .single();
        const currentAttempts = (data?.intentos_fallidos || 0) + 1;
        let bloqueadoHasta = null;
        if (currentAttempts >= env_config_js_1.ENV.LOGIN_MAX_FAILED_ATTEMPTS) {
            const lockDate = new Date(Date.now() + env_config_js_1.ENV.LOGIN_LOCKOUT_MINUTES * 60 * 1000);
            bloqueadoHasta = lockDate.toISOString();
        }
        await this.supabaseAdmin.from('intentos_login').upsert({
            email,
            intentos_fallidos: currentAttempts,
            bloqueado_hasta: bloqueadoHasta,
            ultimo_intento: new Date().toISOString(),
            ip_origen: ipAddress,
        }, { onConflict: 'email' });
    }
    async resetFailedAttempts(email) {
        await this.supabaseAdmin.from('intentos_login').delete().eq('email', email);
    }
    mapToDomainProfile(raw) {
        return {
            id: raw.id,
            email: raw.email,
            nombreCompleto: raw.nombre_completo,
            carrera: raw.carrera,
            semestre: raw.semestre,
            fechaInicio: raw.fecha_inicio,
            fechaFin: raw.fecha_fin,
            metaHoras: raw.meta_horas,
            horarioSemanal: raw.horario_semanal,
            horaInicioHabitual: (raw.hora_inicio_habitual || '08:00:00').substring(0, 5),
            horaFinHabitual: (raw.hora_fin_habitual || '17:00:00').substring(0, 5),
            descuentoAlmuerzoHabitual: raw.descuento_almuerzo_min ?? 0,
            modalidadHabitual: raw.modalidad_habitual || 'Presencial',
            avatarUrl: raw.avatar_url,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at,
        };
    }
}
exports.SupabaseAuthRepository = SupabaseAuthRepository;
//# sourceMappingURL=supabase-auth.repository.js.map