import nodemailer from 'nodemailer';

import { IMailAdapter, ISendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5466cb856c084a',
    pass: '0b2866e4e63121',
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ body, subject }: ISendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'João Victor Ramalho Alves <joaovictorramalho7@gmail.com>',
      subject,
      html: body,
    });
  }
}
