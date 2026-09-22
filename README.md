# 🚀 PractiHoras Backend API (Módulo de Autenticación & Supabase)

Backend RESTful desarrollado con **Node.js, Express, TypeScript y Supabase (PostgreSQL)** bajo los principios de **Clean Architecture** y **Reglas de Negocio Claves** para la gestión de prácticas pre-profesionales.

---

## 🛠️ Stack Tecnológico

- **Runtime & Lenguaje**: Node.js v20+ / TypeScript 5
- **Framework Web**: Express.js con Helmet y CORS
- **Base de Datos & Auth**: Supabase (@supabase/supabase-js) sobre PostgreSQL
- **Validación de Esquemas**: Zod
- **Seguridad Criptográfica**: Node Crypto (SHA-256) y BCrypt

---

## 📂 Arquitectura del Proyecto

```
Backend/
├── package.json
├── tsconfig.json
├── .env.example                # Plantilla de variables de entorno
├── supabase/
│   └── schema.sql              # DDL de PostgreSQL, RLS, Triggers y Funciones
└── src/
    ├── config/                 # Variables de entorno y cliente Supabase
    ├── core/                   # Errores globales, middlewares y utilitarios
    │   ├── errors/             # AppError, BadRequestError, AccountLockedError, etc.
    │   ├── middlewares/        # Auth Guard (JWT), Error Handler, Zod Validator
    │   └── utils/              # CryptoUtil (SHA-256) y TimeUtil (Cálculo de horas)
    ├── modules/
    │   └── auth/               # Módulo de Autenticación (Clean Architecture)
    │       ├── domain/         # Entidades, Interfaces y Reglas de Negocio Puras
    │       ├── application/    # Casos de Uso (Register, Login, Reset, Profile, etc.)
    │       ├── infrastructure/ # Repositorio Supabase y Schemas de Zod
    │       └── presentation/   # Controlador y Rutas de Express
    ├── app.ts                  # Configuración de Express
    └── server.ts               # Entrada del servidor HTTP
```

---

## 🔒 Reglas de Negocio Implementadas

1. **Fortaleza de Contraseñas**:
   - Mínimo 8 caracteres.
   - Requiere mayúscula, minúscula, número y carácter especial (`!@#$%^&*`).
2. **Validación de Fechas de Convenio**:
   - `fechaInicio` debe ser anterior a `fechaFin`.
   - Duración mínima de 30 días y máxima de 2 años.
3. **Meta de Horas Académicas**:
   - Rango permitido entre 100 y 1200 horas (estándar universitario: 360 / 480 horas).
4. **Jornada Laboral Máxima Legal**:
   - Límite de **8.0 horas netas diarias** de práctica pre-profesional (descontando refrigerio).
   - Cálculo automático de minutos y horas netas.
5. **Protección Anti-Fuerza Bruta**:
   - Bloqueo temporal automático de **15 minutos** tras **5 intentos fallidos consecutivos** (`public.intentos_login`).
6. **Ciclo de Vida de Recuperación de Contraseña**:
   - Tokens criptográficos con hash SHA-256 almacenados en `public.tokens_recuperacion`.
   - Expiración estricta de **30 minutos** e invalidación inmediata tras su uso.

---

## 🗄️ Configuración de Supabase

1. Abre tu proyecto en el [Dashboard de Supabase](https://supabase.com/dashboard).
2. Ve a la sección **SQL Editor**.
3. Copia el contenido del archivo [`Backend/supabase/schema.sql`](file:///c:/DEV/PractiHoras/Backend/supabase/schema.sql) y ejecútalo.
4. En **Project Settings -> API**, copia:
   - `Project URL`
   - `anon public` key
   - `service_role secret` key
5. Pégalos en tu archivo `Backend/.env`.

---

## ⚙️ Variables de Entorno (`.env`)

```env
PORT=3000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:4200

SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui

LOGIN_MAX_FAILED_ATTEMPTS=5
LOGIN_LOCKOUT_MINUTES=15
RESET_TOKEN_EXPIRATION_MINUTES=30
```

---

## 📡 Endpoints de la API (`/api/v1/auth`)

| Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Registro de practicante + perfil | Público |
| `POST` | `/api/v1/auth/login` | Login con credenciales + Anti-Brute Force | Público |
| `POST` | `/api/v1/auth/forgot-password` | Solicitud de enlace/token de recuperación (30 min) | Público |
| `POST` | `/api/v1/auth/reset-password` | Actualización de contraseña con token validado | Público |
| `GET` | `/api/v1/auth/me` | Obtiene el perfil del usuario activo | Bearer Token |
| `PUT` | `/api/v1/auth/profile` | Actualiza horarios, meta y datos de perfil | Bearer Token |
| `POST` | `/api/v1/auth/logout` | Revoca la sesión del usuario | Bearer Token |
| `GET` | `/api/health` | Verificación del estado del servidor API | Público |

---

## 🚀 Comandos de Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo con recarga en caliente
npm run dev

# Compilar proyecto TypeScript a JavaScript
npm run build

# Iniciar en producción
npm start
```
