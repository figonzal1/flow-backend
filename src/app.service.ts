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

    // Firmar los parámetros
    const payload = signParams(params, this.secretKey);
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.api}/customer/list?apiKey=${payload.apiKey}&s=${payload.s}`,
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
    const client = 'Carlos Sepulveda';
    const email = 'csepulveda@tuxpan.com';
    const externalId = 'figonzal-1212';

    // 1. Crear un objeto con los parámetros a enviar (excluyendo 's')
    const params = {
      apiKey: this.apikey,
      name: client,
      email: email,
      externalId: externalId,
    };

    const payload = signParams(params, this.secretKey);


    try {
      // 6. Realizar la petición POST a la API de Flow.cl
      const response = await firstValueFrom(
        this.httpService.post(`${this.api}/customer/create`, payload),
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
