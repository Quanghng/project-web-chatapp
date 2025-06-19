import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class ConversationParticipant {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  conversationId: number;

  @Field(() => Date)
  joinedAt: Date;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class Conversation {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [ConversationParticipant])
  participants: ConversationParticipant[];

  @Field(() => [Message])
  messages: Message[];
}

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