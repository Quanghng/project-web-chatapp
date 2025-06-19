import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class ModifyThreadDto {
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  threadId: number

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string
}