import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { createHmac } from 'crypto';
import { signParams } from 'utils/sign';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  api = 'https://sandbox.flow.cl/api';
  apikey = '6281A1FC-EFF3-4FE9-A5D2-1LCAE92B0BA6';
  secretKey = '43dab2cd8b7d93063a36a5adceb40b5f00751903';

  getHello(): string {
    return 'Hello World!';
  }

  async getClients() {
    const params = {
      apiKey: this.apikey,
    };

    const payload = signParams(params, this.secretKey);
    console.log(payload);

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.api}/customer/list?apiKey=${payload.apiKey}&s=${payload.s}`,
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        ),
      );

      return response.data;
    } catch (error) {
      console.log(
        'Error al obtener los clientes:',
        error.response?.data || error.message,
      );
    }
  }

  async getClient() {
    const params = {
      apiKey: this.apikey,
      customerId: 'cus_bdf880f411',
    };

    const payload = signParams(params, this.secretKey);
    console.log(payload);

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.api}/customer/get?apiKey=${payload.apiKey}&customerId=${payload.customerId}&s=${payload.s}`,
        ),
      );

      return response.data;
    } catch (error) {
      console.log(
        'Error al obtener los clientes:',
        error.response?.data || error.message,
      );
    }
  }

  async createClient() {
    const client = 'Felipe González';
    const email = 'figonzal@outlook.cl';
    const externalId = 'figonzal-1212';

    // 1. Crear un objeto con los parámetros a enviar (excluyendo 's')
    const params = {
      apiKey: this.apikey,
      name: client,
      email: email,
      externalId: externalId,
    };

    const payload = signParams(params, this.secretKey);
    console.log(payload);

    const requestData = new URLSearchParams(payload);

    try {
      // 6. Realizar la petición POST a la API de Flow.cl
      const response = await firstValueFrom(
        this.httpService.post(`${this.api}/customer/create`, requestData),
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error al crear el cliente:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async registerCard() {
    const params = {
      apiKey: this.apikey,
      customerId: 'cus_bdf880f411',
      url_return: 'http://localhost',
    };

    const payload = signParams(params, this.secretKey);
    console.log(payload);

    const requestData = new URLSearchParams(payload);

    try {
      // 6. Realizar la petición POST a la API de Flow.cl
      const response = await firstValueFrom(
        this.httpService.post(`${this.api}/customer/register`, requestData),
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error al crear el cliente:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async getCharges() {
    const params = {
      apiKey: this.apikey,
      customerId: 'cus_bdf880f411',
    };

    const payload = signParams(params, this.secretKey);
    console.log(payload);

    try {
      // 6. Realizar la petición POST a la API de Flow.cl
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.api}/customer/getCharges?apiKey=${payload.apiKey}&customerId=${payload.customerId}&s=${payload.s}`,
        ),
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error al crear el cliente:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async makeCharge() {
    const params = {
      apiKey: this.apikey,
      customerId: 'cus_bdf880f411',
      commerceOrder: 'qwertyuiop',
      subject: 'Cobro de prueba',
      amount: '5000',
      urlConfirmation: 'http://localhost/ok',
      urlReturn: 'http://localhost/return',
      currency: 'CLP',
    };

    const payload = signParams(params, this.secretKey);
    console.log(payload);

    const requestData = new URLSearchParams(payload);

    try {
      // 6. Realizar la petición POST a la API de Flow.cl
      const response = await firstValueFrom(
        this.httpService.post(`${this.api}/customer/collect`, requestData),
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error al crear el cliente:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async makePaymentOrder() {
    const params = {
      apiKey: this.apikey,
      commerceOrder: 'qwertyuiop12',
      subject: 'Orden de pago',
      amount: '1200',
      urlConfirmation: 'http://localhost/ok',
      urlReturn: 'http://localhost/return',
      currency: 'CLP',
      email: 'figonzal@outlook.cl',
    };

    const payload = signParams(params, this.secretKey);
    console.log(payload);

    const requestData = new URLSearchParams(payload);

    try {
      // 6. Realizar la petición POST a la API de Flow.cl
      const response = await firstValueFrom(
        this.httpService.post(`${this.api}/payment/create`, requestData),
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error al crear el cliente:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
