import FlowAPI from '@ganatiempo/flow-ts-lib';
import { ENVIRONMENT } from '@ganatiempo/flow-ts-lib/lib/utils/constant';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: FlowAPI,
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('FLOW_API_KEY') as string;
        const secretKey = configService.get<string>(
          'FLOW_SECRET_KEY',
        ) as string;
        let environment = configService.get<string>(
          'FLOW_ENVIRONMENT',
        ) as ENVIRONMENT;

        environment =
          ENVIRONMENT[environment as unknown as keyof typeof ENVIRONMENT] ||
          ENVIRONMENT.SANDBOX;

        return new FlowAPI({
          apiKey,
          secretKey,
          environment,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [FlowAPI],
})
export class FlowApiModule {}
