import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import * as argon2 from "argon2"
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { TokenDto } from "./dto/tokens.dto";

@Injectable()
export class AuthService {

  private token_mode_cookie: string;
  private forntendDomain: string;

  constructor(private readonly prismaService: PrismaService, private jwtService: JwtService, private config: ConfigService) {
    this.token_mode_cookie = this.config.get<string>('TOKEN_COOKIE_MODE') || '';
    this.forntendDomain = this.config.get<string>('FRONTEND_DOMAIN') || '';
  }

  async signUp(dto: AuthDto, res: Response) {
    // Generate hash password
    const hashPassword = await argon2.hash(dto.password);

    // Create user in database
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hashPassword,
          firstName: null,
          lastName: null,
        }
      })

      // Generate tokens and hash it in database
      const tokens = await this.getTokens(user.id, user.email);
      const hashedRefreshToken = await argon2.hash(tokens.refreshToken);

      // Update user with refresh token
      await this.prismaService.user.update({
        where: {
          id: user.id
        },
        data: {
          refreshToken: hashedRefreshToken
        }
      })

      // Send tokens with cookie httpOnly
      if (this.token_mode_cookie === 'true') {
        res.cookie('jwt', tokens.accessToken, { httpOnly: true, domain: this.forntendDomain });
        return { refreshToken: tokens.refreshToken };
      }

      return tokens

    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }

  }

  async signIn(dto: AuthDto, res: Response) {
    // Get user from database
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    // If user not found
    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }

    // Compare password
    const isPasswordMatch = await argon2.verify(user.hash, dto.password);
    if (!isPasswordMatch) throw new ForbiddenException(
      'Invalid email or password'
    )

    // Generate tokens and hash it in database
    const tokens = await this.getTokens(user.id, user.email);
    const hashedRefreshToken = await argon2.hash(tokens.refreshToken);

    // Update user with refresh token
    await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: hashedRefreshToken
      }
    })

    // Send tokens with cookie httpOnly
    if (this.token_mode_cookie === 'true') {
      res.cookie('jwt', tokens.accessToken, { httpOnly: true, domain: this.forntendDomain });
      return { refreshToken: tokens.refreshToken };
    }

    return tokens
  }

  async logout(id: number) {
    console.log("id : " + id)
    try {
      await this.prismaService.user.update({
        where: {
          id
        },
        data: {
          // Delete the refresh token from the database
          refreshToken: null
        }
      })
    } catch (e) {
      throw new ForbiddenException('Logout failed');
    }

    return { message: 'Logout successful' };
  }

  async getTokens(userId: number, email: string): Promise<TokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      // on signe le token d'acces
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        }
      ),

      // on signe le refreshToken
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '1d',
        }
      ),

    ])

    let tokens: TokenDto = {
      accessToken,
      refreshToken,
    }
    return tokens
  }

  async refreshTokens(userId: number, refreshToken: string, res: Response): Promise<TokenDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user?.refreshToken)
      throw new ForbiddenException('Access denied.')

    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken)

    if (!refreshTokenMatches)
      throw new ForbiddenException('Access denied.')

    const tokens = await this.getTokens(userId, user.email)
    const hashedRefreshToken = await argon2.hash(tokens.refreshToken)

    await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: hashedRefreshToken
      }
    })

    if (this.token_mode_cookie === 'true') {
      res.cookie('jwt', tokens.accessToken, { httpOnly: true, domain: this.forntendDomain });
      return { refreshToken: tokens.refreshToken };
    }

    return tokens
  }
}