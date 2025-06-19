import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Comment } from "src/modules/comment/models/comment.model";

@ObjectType()
export class Thread {
  @ApiProperty({ type: Number, description: "Thread's Id" })
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

  @ApiProperty({ type: String, description: "Thread's title" })
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, description: "Thread's content" })
  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: String, description: "Thread's likes" })
  @Field(type => Int)
  @IsNumber()
  likes: number;


  @ApiPropertyOptional({ type: () => [Comment], description: "Thread's comment section" })
  @Field(type => [Comment], { nullable: true })
  @IsArray()
  @IsOptional()
  comments?: Comment[];

  @ApiProperty({ type: Number, description: "Thread's userId" })
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Field(type => String, { nullable: true })
  @ApiPropertyOptional({ type: String, description: "Thread image URL" })
  @IsOptional()
  @IsString()
  imageUrl?: string | null;
}