import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Comment } from "./models/comment.model";
import { CommentService } from "./comment.service";
import { PostCommentDto } from "./dto/post-comment.dto";
import { User } from "../user/models/user.model";
import { Thread } from "../thread/models/thread.model";
import { UserService } from "../user/user.service";
import { forwardRef, Inject } from "@nestjs/common";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) { }

  @Query(() => [Comment])
  async getComments(
    @Args('threadId') threadId: number,
  ): Promise<Comment[]> {
    return this.commentService.getCommentsByThread(threadId);
  }

  @Mutation(() => Comment)
  async postComment(
    @Args('inputs') inputs: PostCommentDto,
  ): Promise<Comment> {
    return this.commentService.postComment(inputs)
  }

  @ResolveField(() => User)
  async user(@Parent() comment: Comment): Promise<User> {
    return this.userService.getUserById(comment.userId);
  }

}