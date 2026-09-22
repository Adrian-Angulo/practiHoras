"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRuleViolationError = exports.AccountLockedError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    code;
    constructor(message, statusCode = 400, code = 'BAD_REQUEST', isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = 'Solicitud incorrecta', code = 'BAD_REQUEST') {
        super(message, 400, code);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError {
    constructor(message = 'Credenciales inválidas o no autorizado', code = 'UNAUTHORIZED') {
        super(message, 401, code);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Acceso denegado', code = 'FORBIDDEN') {
        super(message, 403, code);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado', code = 'NOT_FOUND') {
        super(message, 404, code);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = 'El recurso ya existe', code = 'CONFLICT') {
        super(message, 409, code);
    }
}
exports.ConflictError = ConflictError;
class AccountLockedError extends AppError {
    constructor(minutesLeft) {
        super(`Cuenta temporalmente bloqueada por exceso de intentos fallidos. Intenta nuevamente en ${minutesLeft} minutos.`, 429, 'ACCOUNT_LOCKED');
    }
}
exports.AccountLockedError = AccountLockedError;
class BusinessRuleViolationError extends AppError {
    constructor(message, code = 'BUSINESS_RULE_VIOLATION') {
        super(message, 422, code);
    }
}
exports.BusinessRuleViolationError = BusinessRuleViolationError;
//# sourceMappingURL=app-error.js.map