import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { doubleCsrf } from 'csrf-csrf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CsrfGuard implements CanActivate {

  private csrfProtection;

  constructor(
    private config: ConfigService
  ) {
    this.csrfProtection = doubleCsrf({
      getSecret: () => {
        const secret = this.config.get<string | string[]>('CSRF_SECRET');
        if (!secret) {
          throw new Error('CSRF_SECRET is not defined in the configuration');
        }
        return secret;
      },
      cookieName: this.config.get('CSRF_COOKIE_NAME'),
    });
  }



  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const res = context.switchToHttp().getResponse<Response>()

    // Votre middleware express transformé en guard
    this.csrfProtection.doubleCsrfProtection(req, res, error => {

      if (error == this.csrfProtection.invalidCsrfTokenError) {
        res.status(403).json({
          error: 'csrf validation error'
        })
        throw new Error('Csrf guard activated!')
      }
    });

    return true;
  }
}
