import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [MessageService, MessageResolver, PrismaService],
  exports: [MessageService],
})
export class MessageModule {} 