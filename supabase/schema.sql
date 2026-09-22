-- ==============================================================================
-- PRACTIHORAS - ESQUEMA DE BASE DE DATOS SUPABASE (POSTGRESQL) DESDE CERO
-- Módulo de Autenticación, Perfiles con Horario Semanal Multidía y Registro de Horas
-- ==============================================================================

-- 1. LIMPIEZA INICIAL (RESET COMPLETO)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS trg_perfiles_updated_at ON public.perfiles;
DROP TRIGGER IF EXISTS trg_registros_horas_updated_at ON public.registros_horas;

DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

DROP TABLE IF EXISTS public.registros_horas CASCADE;
DROP TABLE IF EXISTS public.tokens_recuperacion CASCADE;
DROP TABLE IF EXISTS public.intentos_login CASCADE;
DROP TABLE IF EXISTS public.perfiles CASCADE;

-- 2. EXTENSIONES REQUERIDAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 3. TABLA: public.perfiles
-- Vinculada 1 a 1 con auth.users mediante UUID
-- Incluye horario_semanal JSONB con configuración día a día (Lunes a Domingo)
-- ==============================================================================
CREATE TABLE public.perfiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    nombre_completo TEXT NOT NULL,
    carrera TEXT DEFAULT 'Ingeniería de Software',
    semestre TEXT DEFAULT 'Semestre 2025-1',
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_fin DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '6 months'),
    meta_horas INTEGER NOT NULL DEFAULT 360 CHECK (meta_horas > 0 AND meta_horas <= 1200),
    
    -- Horario Semanal Multidía en formato JSONB estructurado
    horario_semanal JSONB NOT NULL DEFAULT '{
      "lunes":     { "activo": true,  "horaInicio": "08:00", "horaFin": "13:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" },
      "martes":    { "activo": true,  "horaInicio": "14:00", "horaFin": "19:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" },
      "miercoles": { "activo": true,  "horaInicio": "14:00", "horaFin": "19:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" },
      "jueves":    { "activo": true,  "horaInicio": "08:00", "horaFin": "13:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" },
      "viernes":   { "activo": true,  "horaInicio": "08:00", "horaFin": "13:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" },
      "sabado":    { "activo": false, "horaInicio": "08:00", "horaFin": "13:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" },
      "domingo":   { "activo": false, "horaInicio": "08:00", "horaFin": "13:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" }
    }'::jsonb,

    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),

    -- Regla de Integridad de Negocio: Fecha de inicio debe ser anterior a fecha de fin
    CONSTRAINT chk_fechas_convenio CHECK (fecha_inicio < fecha_fin)
);

CREATE INDEX idx_perfiles_email ON public.perfiles(email);

-- ==============================================================================
-- 4. TABLA: public.registros_horas (Jornadas Diarias de Práctica)
-- ==============================================================================
CREATE TABLE public.registros_horas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.perfiles(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    descuento_almuerzo_min INTEGER NOT NULL DEFAULT 0 CHECK (descuento_almuerzo_min >= 0 AND descuento_almuerzo_min <= 180),
    horas_computables NUMERIC(4,2) NOT NULL CHECK (horas_computables > 0 AND horas_computables <= 24),
    modalidad TEXT NOT NULL DEFAULT 'Presencial' CHECK (modalidad IN ('Presencial', 'Remoto', 'Híbrido')),
    actividades TEXT NOT NULL,
    supervisor_nombre TEXT,
    estado TEXT NOT NULL DEFAULT 'Aprobado' CHECK (estado IN ('Borrador', 'Pendiente', 'Aprobado', 'Observado')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_registros_horas_user ON public.registros_horas(user_id);
CREATE INDEX idx_registros_horas_fecha ON public.registros_horas(fecha);

-- ==============================================================================
-- 5. TABLA: public.intentos_login (Anti-Brute Force)
-- ==============================================================================
CREATE TABLE public.intentos_login (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    intentos_fallidos INTEGER NOT NULL DEFAULT 0,
    bloqueado_hasta TIMESTAMPTZ,
    ultimo_intento TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    ip_origen TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_intentos_login_email ON public.intentos_login(email);

-- ==============================================================================
-- 6. TABLA: public.tokens_recuperacion
-- ==============================================================================
CREATE TABLE public.tokens_recuperacion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    expira_en TIMESTAMPTZ NOT NULL,
    utilizado BOOLEAN NOT NULL DEFAULT FALSE,
    utilizado_en TIMESTAMPTZ,
    ip_solicitud TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_tokens_recuperacion_hash ON public.tokens_recuperacion(token_hash);
CREATE INDEX idx_tokens_recuperacion_user ON public.tokens_recuperacion(user_id);

-- ==============================================================================
-- 7. FUNCIONES Y TRIGGERS AUTOMÁTICOS
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_perfiles_updated_at ON public.perfiles;
CREATE TRIGGER trg_perfiles_updated_at
    BEFORE UPDATE ON public.perfiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_registros_horas_updated_at ON public.registros_horas;
CREATE TRIGGER trg_registros_horas_updated_at
    BEFORE UPDATE ON public.registros_horas
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Crear perfil automáticamente al registrar usuario en auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.perfiles (
        id,
        email,
        nombre_completo,
        carrera,
        semestre,
        fecha_inicio,
        fecha_fin,
        meta_horas,
        horario_semanal
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'nombreCompleto', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'carrera',
        NEW.raw_user_meta_data->>'semestre',
        COALESCE((NEW.raw_user_meta_data->>'fechaInicio')::DATE, CURRENT_DATE),
        COALESCE((NEW.raw_user_meta_data->>'fechaFin')::DATE, (CURRENT_DATE + INTERVAL '6 months')::DATE),
        COALESCE((NEW.raw_user_meta_data->>'metaHoras')::INTEGER, 360),
        COALESCE((NEW.raw_user_meta_data->'horarioSemanal')::jsonb, '{
          "lunes":     { "activo": true,  "horaInicio": "08:00", "horaFin": "17:00", "descuentoAlmuerzoMinutos": 60, "modalidad": "Presencial" },
          "martes":    { "activo": true,  "horaInicio": "08:00", "horaFin": "17:00", "descuentoAlmuerzoMinutos": 60, "modalidad": "Presencial" },
          "miercoles": { "activo": true,  "horaInicio": "08:00", "horaFin": "17:00", "descuentoAlmuerzoMinutos": 60, "modalidad": "Presencial" },
          "jueves":    { "activo": true,  "horaInicio": "08:00", "horaFin": "17:00", "descuentoAlmuerzoMinutos": 60, "modalidad": "Presencial" },
          "viernes":   { "activo": true,  "horaInicio": "08:00", "horaFin": "17:00", "descuentoAlmuerzoMinutos": 60, "modalidad": "Presencial" },
          "sabado":    { "activo": false, "horaInicio": "08:00", "horaFin": "13:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" },
          "domingo":   { "activo": false, "horaInicio": "08:00", "horaFin": "13:00", "descuentoAlmuerzoMinutos": 0,  "modalidad": "Presencial" }
        }'::jsonb)
    )
    ON CONFLICT (id) DO UPDATE SET
        nombre_completo = EXCLUDED.nombre_completo,
        meta_horas = EXCLUDED.meta_horas,
        horario_semanal = EXCLUDED.horario_semanal;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear trigger de forma segura
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 8. SEGURIDAD A NIVEL DE FILAS (ROW LEVEL SECURITY - RLS)
-- ==============================================================================
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registros_horas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intentos_login ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tokens_recuperacion ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura y edición de perfil propio" ON public.perfiles;
CREATE POLICY "Lectura y edición de perfil propio"
    ON public.perfiles
    FOR ALL
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Acceso total a registros de horas propios" ON public.registros_horas;
CREATE POLICY "Acceso total a registros de horas propios"
    ON public.registros_horas
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
