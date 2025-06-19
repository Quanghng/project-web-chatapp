import { forwardRef, Module } from "@nestjs/common";
import { ThreadService } from "./thread.service";
import { ThreadResolver } from "./thread.resolver";
import { PrismaService } from "../prisma/prisma.service";
import { CommentLoader } from "../comment/loaders/comment.loader";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [ThreadService, ThreadResolver, PrismaService, CommentLoader, UserService]
})
export class ThreadModule { }