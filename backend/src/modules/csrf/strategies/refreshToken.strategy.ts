import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    // Extract the refresh token from the request header and validate (decrypt) it with the refresh secret
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization')!.replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
