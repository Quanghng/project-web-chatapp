import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from './conversation.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ConversationService', () => {
  let service: ConversationService;
  const mockPrismaService = {
    conversation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    conversationParticipant: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ConversationService>(ConversationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createConversation', () => {
    it('should create a new conversation', async () => {
      const mockData = { title: 'New Chat' } as any;
      const mockResult = { id: 1, title: 'New Chat' };
      mockPrismaService.conversation.create.mockResolvedValue(mockResult);
      const result = await service.createConversation(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrismaService.conversation.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('getConversations', () => {
    it('should return all conversations with participants and latest message', async () => {
      const mockResult = [{ id: 1, title: 'Chat' }];
      mockPrismaService.conversation.findMany.mockResolvedValue(mockResult);
      const result = await service.getConversations();
      expect(result).toEqual(mockResult);
      expect(mockPrismaService.conversation.findMany).toHaveBeenCalled();
    });
  });

  describe('getConversationById', () => {
    it('should return the conversation with matching id', async () => {
      const mockResult = { id: 1, title: 'Chat' };
      mockPrismaService.conversation.findUnique.mockResolvedValue(mockResult);
      const result = await service.getConversationById(1);
      expect(result).toEqual(mockResult);
      expect(mockPrismaService.conversation.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: expect.any(Object),
      });
    });
  });

  describe('addParticipantToConversation', () => {
    it('should create a participant in a conversation', async () => {
      mockPrismaService.conversationParticipant.create.mockResolvedValue({});
      await service.addParticipantToConversation(1, 2);
      expect(mockPrismaService.conversationParticipant.create).toHaveBeenCalledWith({
        data: { conversationId: 1, userId: 2 },
      });
    });
  });

  describe('getConversationsByUser', () => {
    it('should return conversations for a user', async () => {
      const mockResult = [{ id: 1, title: 'Chat' }];
      mockPrismaService.conversation.findMany.mockResolvedValue(mockResult);
      const result = await service.getConversationsByUser(1);
      expect(result).toEqual(mockResult);
      expect(mockPrismaService.conversation.findMany).toHaveBeenCalledWith({
        where: {
          participants: {
            some: {
              userId: 1,
            },
          },
        },
        include: expect.any(Object),
      });
    });
  });
});
