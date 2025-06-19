import { Args, Query, Mutation, Resolver, ResolveField, Parent } from "@nestjs/graphql";
import { Thread } from "./models/thread.model";
import { ThreadService } from "./thread.service";
import { PostThreadDto } from "./dto/post-thread.dto";
import { ModifyThreadDto } from "./dto/modify-thread.dto";
import { CommentLoader } from "../comment/loaders/comment.loader";
import { Comment } from "../comment/models/comment.model";
import { User } from "../user/models/user.model";
import { forwardRef, Inject } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Resolver(() => Thread)
export class ThreadResolver {
  constructor(
    private threadService: ThreadService,
    private readonly commentLoader: CommentLoader,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) { }

  @Query(() => [Thread])
  async getThreads(): Promise<Thread[]> {
    return this.threadService.getThreads();
  }

  @Query(() => Thread)
  async getThread(
    @Args('threadId') threadId: number,
  ): Promise<Thread> {
    return this.threadService.getThreadById(threadId);
  }

  @Mutation(() => Thread)
  async postThread(
    @Args('inputs') inputs: PostThreadDto,
  ): Promise<Thread> {
    return this.threadService.postThread(inputs)
  }

  @Mutation(() => Thread)
  async modifyThread(
    @Args('inputs') inputs: ModifyThreadDto,
  ): Promise<Thread> {
    return this.threadService.modifyThread(inputs)
  }

  @Mutation(() => Thread)
  async deleteThread(
    @Args('threadId') threadId: number,
  ): Promise<Thread> {
    return this.threadService.deleteThread(threadId)
  }

  @Mutation(() => Thread)
  async likeThread(
    @Args('threadId') threadId: number,
  ): Promise<Thread> {
    return this.threadService.likeThread(threadId)
  }

  @Mutation(() => Thread)
  async unlikeThread(
    @Args('threadId') threadId: number,
  ): Promise<Thread> {
    return this.threadService.unlikeThread(threadId)
  }

  @ResolveField(() => User)
  async user(@Parent() thread: Thread): Promise<User> {
    return this.userService.getUserById(thread.userId);
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() thread: Thread): Promise<Comment[]> {
    return this.commentLoader.batchCommentsByThread.load(thread.id);
  }



}