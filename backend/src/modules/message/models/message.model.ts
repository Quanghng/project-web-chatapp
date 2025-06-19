import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Message {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  conversationId: number;

  @Field(() => User)
  user: User;
} 