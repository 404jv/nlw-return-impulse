import { prisma } from '../../prisma';
import {
  IFeedbackCreateData,
  IFeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create({ comment, screenshot, type }: IFeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        comment,
        screenshot,
        type,
      },
    });
  }
}
