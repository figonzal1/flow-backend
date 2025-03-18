import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { FlowApiModule } from './flow-api/flow-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    FlowApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
