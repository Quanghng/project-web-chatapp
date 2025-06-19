import { Controller, Get, Req, Res } from "@nestjs/common";
import { CsrfService } from "./csrf.service";
import { Request, Response } from "express";

@Controller("csrf")
export class CsrfController {
  constructor(private readonly csrfService: CsrfService) {
  }

  @Get()
  getCsrfToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.csrfService.getToken(req, res);
  }

}