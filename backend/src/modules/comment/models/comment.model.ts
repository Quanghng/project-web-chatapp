import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

@ObjectType()
export class Comment {
  @ApiProperty({ type: Number, description: "Comment's Id" })
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ type: Date, description: "Creation date" })
  @Field(type => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ type: Date, description: "Update date" })
  @Field(type => Date)
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @ApiProperty({ type: String, description: "Comment's content" })
  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: String, description: "Thread's likes" })
  @Field(type => Int)
  @IsNumber()
  likes: number;

  @ApiProperty({ type: Number, description: "Comment's threadId" })
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  threadId: number;

  @ApiProperty({ type: Number, description: "Comment's userId" })
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}