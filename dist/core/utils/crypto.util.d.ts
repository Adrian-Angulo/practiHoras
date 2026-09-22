export declare class CryptoUtil {
    /**
     * Genera un hash SHA-256 seguro a partir de una cadena o token
     */
    static hashToken(token: string): string;
    /**
     * Genera un token aleatorio seguro en formato hexadecimal
     */
    static generateRandomToken(bytes?: number): string;
    /**
     * Genera un código numérico aleatorio (ej. 6 dígitos)
     */
    static generateNumericCode(digits?: number): string;
}
