import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConversationModule } from '../conversation/conversation.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { ConversationService } from '../conversation/conversation.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

describe('ConversationModule (integration)', () => {
  let app: INestApplication;
  let rabbitMQService: RabbitMQService;
  let conversationService: ConversationService;

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: false,
          path: '/graphql',
        }),
        ConversationModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(RabbitMQService)
      .useValue({
        publishMessage: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    rabbitMQService = moduleFixture.get<RabbitMQService>(RabbitMQService);
    conversationService = moduleFixture.get<ConversationService>(ConversationService);

    if (!conversationService.addParticipantToConversation) {
      conversationService.addParticipantToConversation = jest.fn();
    }
    if (!conversationService.getConversationById) {
      conversationService.getConversationById = jest.fn();
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('createConversation mutation should call conversationService and rabbitMQService', async () => {
    jest.spyOn(conversationService, 'createConversation').mockResolvedValue({ id: 1, name: 'Test Conversation' } as any);
    jest.spyOn(conversationService, 'addParticipantToConversation').mockResolvedValue(undefined);
    jest.spyOn(conversationService, 'getConversationById').mockResolvedValue({ id: 1, name: 'Test Conversation' } as any);

    const mutation = `
      mutation {
        createConversation(inputs: { name: "Test Conversation", participantIds: [1, 2] }) {
          id
          name
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation })
      .expect(200);

    expect(response.body.data.createConversation).toEqual({
      id: 1,
      name: 'Test Conversation',
    });

    expect(conversationService.createConversation).toHaveBeenCalledWith({ name: 'Test Conversation' });
    expect(rabbitMQService.publishMessage).toHaveBeenCalledWith(
      'conversation.created',
      expect.objectContaining({
        conversationId: 1,
        participantIds: [1, 2],
        type: 'CONVERSATION_CREATED',
      }),
    );
  });

  it('getConversations query should return all conversations', async () => {
    jest.spyOn(conversationService, 'getConversations').mockResolvedValue([{ id: 1, name: 'Chat 1' }] as any);

    const query = `
      query {
        getConversations {
          id
          name
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.getConversations).toEqual([{ id: 1, name: 'Chat 1' }]);
    expect(conversationService.getConversations).toHaveBeenCalled();
  });

  it('getConversation query should return conversation by id', async () => {
    jest.spyOn(conversationService, 'getConversationById').mockResolvedValue({ id: 1, name: 'Chat 1' } as any);

    const query = `
      query {
        getConversation(id: 1) {
          id
          name
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.getConversation).toEqual({ id: 1, name: 'Chat 1' });
    expect(conversationService.getConversationById).toHaveBeenCalledWith(1);
  });

  it('getConversationsByUser query should return conversations for a user', async () => {
    jest.spyOn(conversationService, 'getConversationsByUser').mockResolvedValue([{ id: 1, name: 'Chat 1' }] as any);

    const query = `
      query {
        getConversationsByUser(userId: 42) {
          id
          name
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.getConversationsByUser).toEqual([{ id: 1, name: 'Chat 1' }]);
    expect(conversationService.getConversationsByUser).toHaveBeenCalledWith(42);
  });

  it('addParticipantToConversation mutation should add participant and publish message', async () => {
    jest.spyOn(conversationService, 'addParticipantToConversation').mockResolvedValue(undefined);
    jest.spyOn(conversationService, 'getConversationById').mockResolvedValue({ id: 1, name: 'Chat 1' } as any);

    const mutation = `
      mutation {
        addParticipantToConversation(conversationId: 1, userId: 42) {
          id
          name
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation })
      .expect(200);

    expect(response.body.data.addParticipantToConversation).toEqual({ id: 1, name: 'Chat 1' });
    expect(conversationService.addParticipantToConversation).toHaveBeenCalledWith(1, 42);
    expect(rabbitMQService.publishMessage).toHaveBeenCalledWith(
      'conversation.participant.added',
      expect.objectContaining({
        conversationId: 1,
        userId: 42,
        type: 'PARTICIPANT_ADDED',
      }),
    );
  });
});
