import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CsrfModule, PrismaModule, UserModule } from './modules';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageModule } from './modules/message/message.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // auto-generate schema
    context: ({ req, connection }: { req: Request; connection: any }) => {
      if (connection) {
        // WebSocket connection
        return {
          req: connection.context, // in case add headers later
          userId: connection.extra.userId, // put userId in context
        };
      }
      // HTTP requests (queries/mutations)
      // attach req to context for auth
      return { req };
    },
    subscriptions: {
      'graphql-ws': {
        onConnect: async (ctx) => {
          const authHeader = ctx.connectionParams?.Authorization || '';
          const token = typeof authHeader === 'string' ? authHeader.replace('Bearer ', '') : '';

          if (!token) throw new Error('Missing auth token');
          try {
            if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
              throw new Error('JWT secret is not defined');
            }
            const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
            (ctx.extra as { userId: string }).userId = typeof payload.sub === 'string' ? payload.sub : '';
          } catch {
            throw new Error('Invalid token');
          }
        },
      },
      'subscriptions-transport-ws': true,
    },
  }), ConfigModule.forRoot({ isGlobal: true }), CsrfModule, AuthModule, UserModule, PrismaModule, RabbitMQModule, ConversationModule, MessageModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

