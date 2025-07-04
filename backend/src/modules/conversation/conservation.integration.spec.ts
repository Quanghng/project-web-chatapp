import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MessageModule } from '../message/message.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { MessageService } from '../message/message.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

describe('MessageModule (integration)', () => {
  let app: INestApplication;
  let rabbitMQService: RabbitMQService;
  let messageService: MessageService;

  const mockPrismaService = {
    message: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
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
        MessageModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(RabbitMQService)
      .useValue({
        publishMessage: jest.fn(),
        consumeMessages: jest.fn(),  
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    rabbitMQService = moduleFixture.get<RabbitMQService>(RabbitMQService);
    messageService = moduleFixture.get<MessageService>(MessageService);

    if (!messageService.getMessageById) {
      messageService.getMessageById = jest.fn();
    }
    if (!messageService.getMessagesByConversation) {
      messageService.getMessagesByConversation = jest.fn();
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('sendMessage mutation should save message and publish RabbitMQ event', async () => {
    jest.spyOn(messageService, 'sendMessage').mockResolvedValue({
      id: 1,
      content: 'Hello world',
      userId: 1,
      conversationId: 1,
      user: {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      },
    } as any);

    jest.spyOn(rabbitMQService, 'publishMessage').mockResolvedValue(true);

    const mutation = `
      mutation {
        sendMessage(inputs: { content: "Hello world", userId: 1, conversationId: 1 }) {
          id
          content
          user {
            id
            email
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation })
      .expect(200);

    expect(response.body.data.sendMessage).toEqual({
      id: 1,
      content: 'Hello world',
      user: {
        id: 1,
        email: 'test@example.com',
      },
    });

    expect(messageService.sendMessage).toHaveBeenCalledWith({
      content: 'Hello world',
      user: { connect: { id: 1 } },
      conversation: { connect: { id: 1 } },
    });

    expect(rabbitMQService.publishMessage).toHaveBeenCalledWith(
      'messages',
      expect.objectContaining({
        id: 1,
        content: 'Hello world',
        userId: 1,
        conversationId: 1,
        type: 'MESSAGE_SENT',
      }),
    );
  });

  it('getMessagesByConversation query should return messages', async () => {
  const mockMessages = [
    {
      id: 1,
      content: 'Hello',
      conversationId: 1,
      userId: 1,
      user: {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      },
    },
  ];

  jest.spyOn(messageService, 'getMessagesByConversation').mockResolvedValue(mockMessages as any);

  const query = `
    query {
      getMessagesByConversation(conversationId: 1) {
        id
        content
        user {
          id
          email
        }
      }
    }
  `;

  const response = await request(app.getHttpServer())
    .post('/graphql')
    .send({ query })
    .expect(200);

  expect(response.body.data.getMessagesByConversation).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: 1,
        content: 'Hello',
        user: expect.objectContaining({
          id: 1,
          email: 'test@example.com',
        }),
      }),
    ]),
  );
  expect(messageService.getMessagesByConversation).toHaveBeenCalledWith(1);
});
});

