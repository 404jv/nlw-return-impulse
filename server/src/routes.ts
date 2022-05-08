import { Router } from 'express';
import nodemailer from 'nodemailer';

import { prisma } from './prisma';

const routes = Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5466cb856c084a',
    pass: '0b2866e4e63121',
  },
});

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'João Victor Ramalho Alves <joaovictorramalho7@gmail.com>',
    subject: 'Novo feedback',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      '<h1>🥳 Você recebeu um novo feedback! 🥳</h1>',
      `<p>Tipo: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '</div>',
    ].join('\n'),
  });

  return response.status(201).json({ data: feedback });
});

export { routes };
