import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PostThreadDto } from "./dto/post-thread.dto";
import { Thread } from "@prisma/client";
import { ModifyThreadDto } from "./dto/modify-thread.dto";

@Injectable()
export class ThreadService {
  constructor(private readonly prismaService: PrismaService) { }

  async getThreads(): Promise<Thread[]> {
    return this.prismaService.thread.findMany({
      include: {
        user: true,
      },
    });
  }

  async getThreadById(threadId: number): Promise<Thread> {
    // Check if thread exists
    const thread = await this.prismaService.thread.findUnique({
      where: { id: threadId },
      include: {
        user: true,
      },
    });
    if (!thread) {
      throw new Error("Thread not found");
    }
    return thread as Thread;
  }

  async getThreadsByUser(userId: number) {
    // Check if user exists 
    const userExists = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new Error("User not found");
    }

    return this.prismaService.thread.findMany({
      where: {
        userId,
      },
    });
  }

  async postThread(inputs: PostThreadDto): Promise<Thread> {
    // Check if user exists 
    const userExists = await this.prismaService.user.findUnique({
      where: { id: inputs.userId },
    });
    if (!userExists) {
      throw new Error("User not found");
    }

    // Create thread
    return this.prismaService.thread.create({
      data: {
        userId: inputs.userId,
        title: inputs.title,
        content: inputs.content,
        imageUrl: inputs.imageUrl,
      },
    });
  }

  async modifyThread(inputs: ModifyThreadDto): Promise<Thread> {
    // Check if thread exists 
    const threadExists = await this.prismaService.thread.findUnique({
      where: { id: inputs.threadId },
    });
    if (!threadExists) {
      throw new Error("Thread not found");
    }

    // Update thread
    return this.prismaService.thread.update({
      where: { id: inputs.threadId },
      data: {
        title: inputs.title,
        content: inputs.content,
      },
    });
  }

  async deleteThread(threadId: number): Promise<Thread> {
    // Check if thread exists 
    const threadExists = await this.prismaService.thread.findUnique({
      where: { id: threadId },
    });
    if (!threadExists) {
      throw new Error("Thread not found");
    }

    // Delete thread
    return this.prismaService.thread.delete({
      where: { id: threadId },
    });
  }

  async likeThread(threadId: number): Promise<Thread> {
    // Check if thread exists 
    const threadExists = await this.prismaService.thread.findUnique({
      where: { id: threadId },
    });
    if (!threadExists) {
      throw new Error("Thread not found");
    }

    // Update thread likes
    return this.prismaService.thread.update({
      where: { id: threadId },
      data: {
        likes: threadExists.likes + 1,
      },
    });
  }

  async unlikeThread(threadId: number): Promise<Thread> {
    // Check if thread exists 
    const threadExists = await this.prismaService.thread.findUnique({
      where: { id: threadId },
    });
    if (!threadExists) {
      throw new Error("Thread not found");
    }

    // Update thread likes
    return this.prismaService.thread.update({
      where: { id: threadId },
      data: {
        likes: threadExists.likes - 1,
      },
    });
  }


}