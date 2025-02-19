import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/createClient')
  createClient() {
    return this.appService.createClient();
  }

  @Get('/getClients')
  getClients() {
    return this.appService.getClients();
  }
}
