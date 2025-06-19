import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';


type JwtPayload = {
  sub: string;
  email: string;
};


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor() {
    const token_mode = process.env.TOKEN_COOKIE_MODE
    let extratedJWT: JwtFromRequestFunction

    if ('true' === token_mode) {
      extratedJWT = ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractCookieJWT,
      ])
    } else {
      extratedJWT = ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ])
    }
    super({
      jwtFromRequest: extratedJWT,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }

  private static extractCookieJWT(req: Request) {
    if (req.cookies && 'jwt' in req.cookies && req.cookies.jwt.length > 0) {
      console.log('JWT: ', req.cookies.jwt)
      return req.cookies.jwt
    }
    return null
  }

}