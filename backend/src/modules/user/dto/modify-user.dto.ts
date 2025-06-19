import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class ModifyUserDto {
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @Field()
  @IsString()
  @IsOptional()
  firstName: string

  @Field()
  @IsString()
  @IsOptional()
  lastName: string
}