import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Thread } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class ThreadLoader {
  constructor(private prisma: PrismaService) { }

  public readonly batchThreadsByUser = new DataLoader<number, Thread[]>(async (userIds) => {
    const threads = await this.prisma.thread.findMany({
      where: {
        userId: { in: userIds as number[] },
      },
    });

    const threadsMap: Record<number, Thread[]> = {};
    userIds.forEach(id => (threadsMap[id] = []));
    threads.forEach(thread => {
      threadsMap[thread.userId].push(thread);
    });

    return userIds.map(id => threadsMap[id]);
  });
}
