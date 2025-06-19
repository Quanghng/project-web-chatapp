import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PostCommentDto } from "./dto/post-comment.dto";
import { Comment } from "./models/comment.model";

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) { }

  async postComment(inputs: PostCommentDto): Promise<Comment> {
    // Create comment
    return this.prismaService.comment.create({
      data: {
        userId: inputs.userId,
        threadId: inputs.threadId,
        content: inputs.content,
      },
    });
  }

  async getCommentsByThread(threadId: number): Promise<Comment[]> {
    // Get comments by thread id
    return this.prismaService.comment.findMany({
      where: { threadId },
      include: { user: true },
    });
  }
}