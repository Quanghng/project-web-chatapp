import { Global, Module } from "@nestjs/common";
import { CsrfController } from "./csrf.controller";
import { CsrfService } from "./csrf.service";
import { ConfigService } from "@nestjs/config";

@Global()
@Module({
  controllers: [CsrfController],
  providers: [CsrfService, ConfigService],
  exports: [CsrfService],
})
export class CsrfModule { }