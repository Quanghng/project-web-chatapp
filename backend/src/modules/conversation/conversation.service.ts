import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Conversation, Prisma } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createConversation(data: Prisma.ConversationCreateInput): Promise<Conversation> {
    return this.prisma.conversation.create({
      data,
    });
  }

  async getConversations(): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      include: {
        participants: {
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
        },
        messages: {
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
          orderBy: {
            createdAt: 'desc',
          },
          take: 1, // Dernier message seulement
        },
      },
    });
  }

  async getConversationById(id: number): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: {
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
        },
        messages: {
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
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async addParticipantToConversation(
    conversationId: number,
    userId: number,
  ): Promise<void> {
    await this.prisma.conversationParticipant.create({
      data: {
        conversationId,
        userId,
      },
    });
  }

  async getConversationsByUser(userId: number): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
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
        },
        messages: {
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
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }
} 