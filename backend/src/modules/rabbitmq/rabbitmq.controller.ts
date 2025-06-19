import { Controller, Post, Body, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('publish')
  async publishMessage(@Body() body: { queue: string; message: any }) {
    try {
      await this.rabbitMQService.publishMessage(body.queue, body.message);
      return { success: true, message: 'Message published successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('health')
  async healthCheck() {
    return { status: 'RabbitMQ service is running' };
  }
} 