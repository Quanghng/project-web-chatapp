import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service";
import { RedisService } from "../redis/redis.service";
import { UserStatusResolver } from "./user-status.resolver";

@Module({
  imports: [],
  providers: [UserService, UserResolver, UserStatusResolver, PrismaService, RedisService]
})
export class UserModule { }