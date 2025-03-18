import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.hola();
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
