import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./models/user.model";
import { ModifyUserDto } from "./dto/modify-user.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('inputs') inputs: ModifyUserDto,
  ): Promise<User> {
    return this.userService.updateUser(inputs);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
}