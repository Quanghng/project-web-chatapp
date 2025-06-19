import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { CsrfGuard } from "../csrf/guards/csrf.guards";
import { AccessTokenStrategy, RefreshTokenStrategy } from "../csrf/strategies";

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CsrfGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    PrismaService,
    ConfigService,
    JwtService
  ]
})

export class AuthModule { }