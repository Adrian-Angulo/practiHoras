declare class MailerService {
    private transporter;
    private getTransporter;
    sendPasswordResetEmail(to: string, code: string, nombre?: string): Promise<boolean>;
}
export declare const mailerService: MailerService;
export {};
