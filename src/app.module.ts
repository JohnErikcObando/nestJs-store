import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';

import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';

import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    HttpModule,
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const response = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await firstValueFrom(response);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
