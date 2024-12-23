import {
  Controller,
  Get,
  Param,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';

import { ApikeyGuard } from './auth/guards/apikey.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApikeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  @Public()
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('/tasks/')
  getTasks() {
    return this.appService.getTasks();
  }
}
