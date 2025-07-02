import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('MessageService', () => {
  let service: MessageService;

  const mockPrismaService = {
    message: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should create a message and return it with user info', async () => {
      const inputData: Prisma.MessageCreateInput = {
        content: 'Hello',
        user: { connect: { id: 1 } },
        conversation: { connect: { id: 1 } },
      };

      const createdMessage = { id: 123, content: 'Hello', userId: 1, conversationId: 1 };

      const returnedMessage = {
        id: 123,
        content: 'Hello',
        userId: 1,
        conversationId: 1,
        user: {
          id: 1,
          email: 'user@example.com',
          firstName: 'Test',
          lastName: 'User',
        },
      };

      mockPrismaService.message.create.mockResolvedValue(createdMessage);
      mockPrismaService.message.findUnique.mockResolvedValue(returnedMessage);

      const result = await service.sendMessage(inputData);

      expect(mockPrismaService.message.create).toHaveBeenCalledWith({ data: inputData });

      expect(mockPrismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: createdMessage.id },
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
      });

      expect(result).toEqual(returnedMessage);
    });
  });

  describe('getMessagesByConversation', () => {
    it('should return messages for a conversation with user info', async () => {
      const conversationId = 42;
      const messages = [
        {
          id: 1,
          content: 'Hi',
          conversationId,
          userId: 1,
          user: {
            id: 1,
            email: 'user1@example.com',
            firstName: 'User',
            lastName: 'One',
          },
        },
        {
          id: 2,
          content: 'Hello',
          conversationId,
          userId: 2,
          user: {
            id: 2,
            email: 'user2@example.com',
            firstName: 'User',
            lastName: 'Two',
          },
        },
      ];

      mockPrismaService.message.findMany.mockResolvedValue(messages);

      const result = await service.getMessagesByConversation(conversationId);

      expect(mockPrismaService.message.findMany).toHaveBeenCalledWith({
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
      expect(result).toEqual(messages);
    });
  });

  describe('getMessageById', () => {
    it('should return a message by id with user info', async () => {
      const id = 123;
      const message = {
        id,
        content: 'Hello',
        conversationId: 1,
        userId: 1,
        user: {
          id: 1,
          email: 'user@example.com',
          firstName: 'Test',
          lastName: 'User',
        },
      };

      mockPrismaService.message.findUnique.mockResolvedValue(message);

      const result = await service.getMessageById(id);

      expect(mockPrismaService.message.findUnique).toHaveBeenCalledWith({
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
      });
      expect(result).toEqual(message);
    });
  });
});
