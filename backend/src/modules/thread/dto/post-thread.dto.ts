import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class PostThreadDto {
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string
}