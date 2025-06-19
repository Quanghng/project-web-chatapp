import { Body, Controller, Post, Req, Res, UseGuards, Version } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./dto";
import { Request, Response } from "express";
import { TokenDto } from "./dto/tokens.dto";
import { AccessTokenGuards, RefreshTokenGuard } from "./guards";
import { CsrfGuard } from "../csrf/guards/csrf.guards";

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    refreshToken: string;
  };
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  // @UseGuards(CsrfGuard)
  @Post("signup")
  signUp(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signUp(dto, res);
  }

  // @UseGuards(CsrfGuard)
  @Post("signin")
  signIn(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(dto, res);
  }

  @UseGuards(AccessTokenGuards)
  @Post("logout")
  logout(@Req() req: AuthenticatedRequest) {
    return this.authService.logout(parseInt(req['user']['sub']));
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  async refreshToken(@Req() req: AuthenticatedRequest, @Res({ passthrough: true }) res: Response): Promise<TokenDto> {
    const userId = parseInt(req['user']['sub'])
    const refresh = req['user']['refreshToken']

    return await this.authService.refreshTokens(
      userId,
      refresh,
      res
    )
  }
}

