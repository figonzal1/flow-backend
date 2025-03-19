import { Injectable } from '@nestjs/common';
import FlowAPI from 'lightq-pay-flow';

@Injectable()
export class AppService {
  constructor(private readonly flowAPI: FlowAPI) {}

  async hola() {
    const result = await this.flowAPI.customer.subscriptionsList({
      customerId: 'cus_bdf880f411',
    });

    return result;
  }

  async registerCard() {
    return await this.flowAPI.tc.registerCard({
      customerId: 'cus_bdf880f411',
      urlReturn:
        'https://enormously-rapid-duckling.ngrok-free.app/api/callback',
    });
  }

  async registerCardStatus(token: string) {
    return await this.flowAPI.tc.getRegisterResult(token);
  }
}
