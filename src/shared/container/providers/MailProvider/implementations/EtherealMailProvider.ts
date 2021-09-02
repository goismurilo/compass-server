import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

export default class EtheralMainProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail(to: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            from: 'Equipe CompassOS <equipe@compass_os.com.br>',
            to,
            subject: 'Recuperação de Senha',
            text: body,
        });

        console.log('Message sent: %s', message.messageID);
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
