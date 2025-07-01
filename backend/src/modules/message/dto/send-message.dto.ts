import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class SendMessageDto {
  @Field(() => String)
  @IsString()
  content: string;

  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => Int)
  @IsInt()
  conversationId: number;
} 