import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,iVBORw0KGgoA',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,iVBORw0KGgoA',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,iVBORw0KGgoA',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with invalid screenshot format', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'invalid_type.jpg',
      })
    ).rejects.toThrow();
  });
});
