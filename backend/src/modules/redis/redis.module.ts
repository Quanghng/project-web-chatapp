import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [RedisService, ConfigService],
  exports: [RedisService], // Export so other modules can use it
})
export class RedisModule { }
