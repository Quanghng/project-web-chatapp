// redis.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  constructor(private configService: ConfigService) { }

  onModuleInit() {
    this.client = new Redis({
      host: this.configService.get('REDIS_HOST') || 'redis',
      port: this.configService.get<number>('REDIS_PORT') || 6379,
    });

    this.client.on('connect', () => console.log('🔌 Redis connected'));
    this.client.on('error', (err) => console.error('❌ Redis error:', err));
  }

  async setOnline(userId: string) {
    await this.client.set(`user:${userId}:online`, 'true', 'EX', 60);
  }

  async setOffline(userId: string) {
    await this.client.del(`user:${userId}:online`);
  }

  async isOnline(userId: string): Promise<boolean> {
    return !!(await this.client.get(`user:${userId}:online`));
  }
}
