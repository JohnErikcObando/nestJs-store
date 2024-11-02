import { ProductsService } from './../services/products.service';
import {
  // ParseIntPipe,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { ParseIntPipe } from '../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `product: limit=>${limit} offset=>${offset} brand=>${brand}`,
    // };

    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter(@Param('id') id: string) {
    return { message: `yo soy un filter` };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  // getOne(@Res() response: Response, @Param('id') productId: string) {
  // response.status(200).send({
  //   message: `product ${productId}`,
  // });
  getOne(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.findOne(+productId);
  }

  @Post()
  crete(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };

    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    // return {
    //   message: 'actualizando producto',
    //   id,
    //   payload,
    // };

    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
