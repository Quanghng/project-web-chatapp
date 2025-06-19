import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    const message = await this.prisma.message.create({
      data,
    });
    // Inclure l'utilisateur dans le retour
    return this.prisma.message.findUnique({
      where: { id: message.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    }) as unknown as Message;
  }

  async getMessagesByConversation(conversationId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { conversationId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getMessageById(id: number): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    }) as unknown as Message;
  }
} 