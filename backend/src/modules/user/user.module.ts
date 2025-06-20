import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [UserService, UserResolver, PrismaService]
})
export class UserModule { }