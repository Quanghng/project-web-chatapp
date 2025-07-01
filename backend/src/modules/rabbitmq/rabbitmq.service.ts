import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private config: ConfigService) { }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.closeConnection();
  }

  private async connect() {
    try {
      this.connection = await amqp.connect(this.config.get<string>('RABBITMQ_URL') || '');
      this.channel = await this.connection.createChannel();

      // Déclarer les queues
      await this.channel.assertQueue('messages', { durable: true });
      await this.channel.assertQueue('notifications', { durable: true });

      console.log('✅ Connected to RabbitMQ');
    } catch (error) {
      console.error('❌ Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  private async closeConnection() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  async publishMessage(queue: string, message: any) {
    try {
      const messageBuffer = Buffer.from(JSON.stringify(message));
      const result = await this.channel.sendToQueue(queue, messageBuffer, {
        persistent: true,
      });

      console.log(`📤 Message published to queue: ${queue}`);
      return result;
    } catch (error) {
      console.error('❌ Failed to publish message:', error);
      throw error;
    }
  }

  async consumeMessages(queue: string, callback: (message: any) => void) {
    try {
      await this.channel.consume(queue, (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          console.log(`📥 Message received from queue: ${queue}`, content);

          callback(content);

          // Acknowledger le message
          this.channel.ack(msg);
        }
      });

      console.log(`👂 Listening to queue: ${queue}`);
    } catch (error) {
      console.error('❌ Failed to consume messages:', error);
      throw error;
    }
  }

  async publishToExchange(exchange: string, routingKey: string, message: any) {
    try {
      await this.channel.assertExchange(exchange, 'topic', { durable: true });
      const messageBuffer = Buffer.from(JSON.stringify(message));

      await this.channel.publish(exchange, routingKey, messageBuffer, {
        persistent: true,
      });

      console.log(`📤 Message published to exchange: ${exchange} with key: ${routingKey}`);
    } catch (error) {
      console.error('❌ Failed to publish to exchange:', error);
      throw error;
    }
  }

  async bindQueueToExchange(queue: string, exchange: string, routingKey: string) {
    try {
      await this.channel.bindQueue(queue, exchange, routingKey);
      console.log(`🔗 Queue ${queue} bound to exchange ${exchange} with key ${routingKey}`);
    } catch (error) {
      console.error('❌ Failed to bind queue to exchange:', error);
      throw error;
    }
  }
} 