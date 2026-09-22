"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtil = void 0;
const crypto_1 = __importDefault(require("crypto"));
class CryptoUtil {
    /**
     * Genera un hash SHA-256 seguro a partir de una cadena o token
     */
    static hashToken(token) {
        return crypto_1.default.createHash('sha256').update(token).digest('hex');
    }
    /**
     * Genera un token aleatorio seguro en formato hexadecimal
     */
    static generateRandomToken(bytes = 32) {
        return crypto_1.default.randomBytes(bytes).toString('hex');
    }
    /**
     * Genera un código numérico aleatorio (ej. 6 dígitos)
     */
    static generateNumericCode(digits = 6) {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return Math.floor(min + Math.random() * (max - min + 1)).toString();
    }
}
exports.CryptoUtil = CryptoUtil;
//# sourceMappingURL=crypto.util.js.map