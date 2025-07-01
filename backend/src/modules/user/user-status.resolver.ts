import { Resolver, Subscription, Mutation, Context } from '@nestjs/graphql';
import { RedisService } from '../redis/redis.service';

@Resolver()
export class UserStatusResolver {
  constructor(private readonly redisService: RedisService) { }

  @Subscription(() => Boolean, {
    resolve: () => true,
  })
  async userOnline(@Context() ctx: any) {
    const userId = ctx.user?.id;
    await this.redisService.setOnline(userId);
    return true;
  }

  @Mutation(() => Boolean)
  async heartbeat(@Context() ctx: any) {
    const userId = ctx.user?.id;
    await this.redisService.setOnline(userId);
    return true;
  }
}
