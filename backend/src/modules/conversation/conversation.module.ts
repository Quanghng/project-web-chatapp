import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [ConversationService, ConversationResolver, PrismaService],
  exports: [ConversationService],
})
export class ConversationModule {} 