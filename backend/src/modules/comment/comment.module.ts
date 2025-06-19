import { forwardRef, Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentResolver } from "./comment.resolver";
import { PrismaService } from "../prisma/prisma.service";
import { CommentLoader } from "./loaders/comment.loader";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";


@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [CommentService, CommentResolver, CommentLoader, PrismaService, UserService]
})
export class CommentModule { }