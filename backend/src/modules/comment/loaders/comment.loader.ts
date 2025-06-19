import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class CommentLoader {
  constructor(private prisma: PrismaService) { }

  public readonly batchCommentsByThread = new DataLoader<number, Comment[]>(async (threadIds) => {
    const comments = await this.prisma.comment.findMany({
      where: {
        threadId: { in: threadIds as number[] },
      },
    });

    const map: Record<number, Comment[]> = {};
    threadIds.forEach(id => (map[id] = []));
    comments.forEach(comment => {
      map[comment.threadId].push(comment);
    });

    return threadIds.map(id => map[id]);
  });
}
