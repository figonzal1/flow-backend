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

  @Get('/getClient')
  getClient() {
    return this.appService.getClient();
  }

  @Get('/getClients')
  getClients() {
    return this.appService.getClients();
  }

  @Get('/registerCard')
  registerCard() {
    return this.appService.registerCard();
  }

  @Get('/getCharges')
  cargosCliente() {
    return this.appService.getCharges();
  }

  @Get('/makeCharge')
  makeCharge() {
    return this.appService.makeCharge();
  }

  @Get('/paymentOrder')
  makePaymentOrder() {
    return this.appService.makePaymentOrder();
  }
}
