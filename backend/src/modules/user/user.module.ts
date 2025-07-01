import { forwardRef, Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { ThreadService } from "../thread/thread.service";
import { PrismaService } from "../prisma/prisma.service";
import { ThreadLoader } from "../thread/loaders/thread.loader";
import { ThreadModule } from "../thread/thread.module";
import { CommentModule } from "../comment/comment.module";
import { RedisService } from "../redis/redis.service";
import { UserStatusResolver } from "./user-status.resolver";


@Module({
  imports: [forwardRef(() => ThreadModule), forwardRef(() => CommentModule)],
  providers: [UserService, UserResolver, UserStatusResolver, ThreadService, ThreadLoader, PrismaService, RedisService]
})
export class UserModule { }