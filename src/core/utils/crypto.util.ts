import crypto from 'crypto';

export class CryptoUtil {
  /**
   * Genera un hash SHA-256 seguro a partir de una cadena o token
   */
  static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Genera un token aleatorio seguro en formato hexadecimal
   */
  static generateRandomToken(bytes = 32): string {
    return crypto.randomBytes(bytes).toString('hex');
  }

  /**
   * Genera un código numérico aleatorio (ej. 6 dígitos)
   */
  static generateNumericCode(digits = 6): string {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  }
}
