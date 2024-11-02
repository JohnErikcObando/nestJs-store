import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController, ProductsController, BrandsController, CustomersController, UsersController],
  providers: [AppService, ProductsService, CategoriesService, CustomersService, UsersService, BrandsService],
})
export class AppModule {}
