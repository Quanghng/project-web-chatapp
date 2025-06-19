import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { doubleCsrf } from "csrf-csrf";
import { Request, Response } from "express";

@Injectable()
export class CsrfService {
  private csrfProtection;

  constructor(private config: ConfigService) {
    this.csrfProtection = doubleCsrf({
      getSecret: () => {
        const secret = this.config.get<string | string[]>("CSRF_SECRET");
        if (!secret) {
          throw new Error("CSRF_SECRET is not defined in the configuration");
        }
        return secret;
      },
      cookieName: this.config.get("CSRF_COOKIE_NAME"),
    });
  }

  getToken(req: Request, res: Response) {
    const csrf = {
      token: this.csrfProtection.generateToken(req, res),
    }

    // Set the CSRF cookie in the response
    const cookieName = this.config.get<string>("CSRF_COOKIE_NAME") || "default_csrf_cookie_name";
    res.cookie(cookieName, csrf.token, {
      httpOnly: true, // For security
      secure: process.env.NODE_ENV === "production", // Set to true for HTTPS
      sameSite: "none", // You can use Lax or None based on your needs
      path: "/", // Make sure the cookie is available to all routes
    });
    return csrf;
  }
}