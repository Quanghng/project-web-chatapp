import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';

@Module({
  imports: [ConfigModule],
  providers: [RabbitMQService],
  controllers: [RabbitMQController],
  exports: [RabbitMQService],
})
export class RabbitMQModule {} 