import { Field, Int, ObjectType } from "@nestjs/graphql"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsArray
} from "class-validator"
import { Comment } from "../../comment/models/comment.model"
import { Thread } from "src/modules/thread/models/thread.model"

@ObjectType({ description: "user" })
export class User {
  @ApiProperty({ type: Number, description: "User ID" })
  @Field(type => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty({ type: Date, description: "Creation date" })
  @Field(type => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date

  @ApiProperty({ type: Date, description: "Update date" })
  @Field(type => Date)
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date

  @ApiProperty({ type: String, description: "Email address" })
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ type: String, description: "Password hash" })
  @Field()
  @IsString()
  @IsNotEmpty()
  hash: string

  @ApiPropertyOptional({ type: String, description: "First name" })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string

  @ApiPropertyOptional({ type: String, description: "Last name" })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string

  @ApiPropertyOptional({ type: String, description: "Refresh token" })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  refreshToken?: string

  @ApiPropertyOptional({ type: () => [Thread], description: "User's threads" })
  @Field(type => [Thread], { nullable: true })
  @IsArray()
  @IsOptional()
  thread?: Thread[]

  @ApiPropertyOptional({ type: () => [Comment], description: "User's comments" })
  @Field(type => [Comment], { nullable: true })
  @IsArray()
  @IsOptional()
  comments?: Comment[]
}
