import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class PostCommentDto {
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  threadId: number

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string
}