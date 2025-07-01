import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

@InputType()
export class CreateConversationDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => [Int])
  @IsArray()
  @IsNumber({}, { each: true })
  participantIds: number[];
} 