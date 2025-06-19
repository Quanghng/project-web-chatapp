import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CsrfModule, ThreadModule, PrismaModule, UserModule, CommentModule } from './modules';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageModule } from './modules/message/message.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Request } from 'express';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // auto-generate schema
    context: ({ req }: { req: Request }) => ({ req }), // attach req to context for auth
    subscriptions: {
      'graphql-ws': true,
      'subscriptions-transport-ws': true,
    },
  }), ConfigModule.forRoot({ isGlobal: true }), CsrfModule, AuthModule, UserModule, ThreadModule, CommentModule, PrismaModule, RabbitMQModule, ConversationModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

