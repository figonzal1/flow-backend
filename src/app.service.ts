import FlowAPI from '@ganatiempo/flow-ts-lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly flowAPI: FlowAPI) {}

  async hola() {
    const result = await this.flowAPI.customer.subscriptionsList({
      customerId: 'cus_bdf880f411',
    });

    return result;
  }
}
