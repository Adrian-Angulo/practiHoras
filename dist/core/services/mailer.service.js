"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_js_1 = require("../../config/env.config.js");
class MailerService {
    transporter = null;
    getTransporter() {
        const user = env_config_js_1.ENV.GMAIL_USER || process.env['GMAIL_USER'] || '';
        const pass = (env_config_js_1.ENV.GMAIL_PASS || process.env['GMAIL_PASS'] || '').replace(/\s+/g, '');
        if (!this.transporter) {
            this.transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user,
                    pass,
                },
            });
        }
        return this.transporter;
    }
    async sendPasswordResetEmail(to, code, nombre) {
        try {
            const user = env_config_js_1.ENV.GMAIL_USER || process.env['GMAIL_USER'] || '';
            const pass = env_config_js_1.ENV.GMAIL_PASS || process.env['GMAIL_PASS'] || '';
            if (!user || !pass) {
                console.warn('⚠️ GMAIL_USER o GMAIL_PASS no están configurados. No se pudo enviar el correo.');
                return false;
            }
            const transporter = this.getTransporter();
            const mailOptions = {
                from: `"Horaly" <${env_config_js_1.ENV.GMAIL_USER}>`,
                to,
                subject: `${code} es tu código de recuperación - Horaly`,
                html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 100%; max-width: 480px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
                    <!-- Encabezado -->
                    <tr>
                      <td style="background-color: #4F46E5; padding: 32px 24px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Horaly</h1>
                        <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px;">Control Inteligente de Prácticas</p>
                      </td>
                    </tr>
                    <!-- Contenido -->
                    <tr>
                      <td style="padding: 32px 28px;">
                        <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin: 0 0 12px 0;">Recuperación de Contraseña</h2>
                        <p style="color: #475569; font-size: 15px; line-height: 24px; margin: 0 0 20px 0;">
                          Hola <strong>${nombre || 'Estudiante'}</strong>, recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Horaly</strong>.
                        </p>
                        
                        <div style="background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
                          <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0; font-weight: 600;">Tu código de verificación</p>
                          <span style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #4F46E5; display: inline-block;">${code}</span>
                        </div>

                        <p style="color: #64748b; font-size: 13px; line-height: 20px; margin: 0 0 24px 0;">
                          Este código es válido por <strong>${env_config_js_1.ENV.RESET_TOKEN_EXPIRATION_MINUTES} minutos</strong>. Ingrésalo en la aplicación para crear tu nueva contraseña.
                        </p>

                        <div style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
                          <p style="color: #94a3b8; font-size: 12px; line-height: 18px; margin: 0;">
                            Si tú no solicitaste este cambio, puedes ignorar este mensaje con total seguridad. Tu contraseña actual no cambiará.
                          </p>
                        </div>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #f1f5f9;">
                        <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                          &copy; ${new Date().getFullYear()} Horaly. Todos los derechos reservados.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
            };
            const info = await transporter.sendMail(mailOptions);
            console.log(`✅ Correo de recuperación de Horaly enviado a ${to} (MessageId: ${info.messageId})`);
            return true;
        }
        catch (error) {
            console.error('❌ Error al enviar correo de recuperación con Gmail:', error);
            return false;
        }
    }
}
exports.mailerService = new MailerService();
//# sourceMappingURL=mailer.service.js.map