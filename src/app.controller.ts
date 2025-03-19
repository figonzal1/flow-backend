import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.hola();
  }

  @Post('/registerCard')
  async registerCard() {
    return this.appService.registerCard();
  }

  @Post('/registerCardCallback')
  async registerCardCallback(@Body() result: string) {
    console.log('REGISTER CALLBACK', result);
  }

  @Get('/registerCardStatus/:token')
  async registerCardStatus(@Param('token') token: string) {
    return this.appService.registerCardStatus(token);
  }
}
