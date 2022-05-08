import { IMailAdapter } from '../adapters/mail-adapter';
import { IFeedbacksRepository } from '../repositories/feedbacks-repository';

interface ISubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute({ comment, screenshot, type }: ISubmitFeedbackUseCaseRequest) {
    await this.feedbacksRepository.create({
      comment,
      screenshot,
      type,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        '<h1>🥳 Você recebeu um novo feedback! 🥳</h1>',
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>',
      ].join('\n'),
    });
  }
}
