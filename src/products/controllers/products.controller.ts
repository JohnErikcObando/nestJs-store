import { ProductsService } from '../services/products.service';
import {
  // ParseIntPipe,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductsDTO,
  UpdateProductDto,
} from '../dtos/products.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get('')
  @ApiOperation({ summary: 'Lista de productos' })
  getProducts(@Query() params: FilterProductsDTO) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter(@Param('id') id: number) {
    return { message: `yo soy un filter` };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.findOne(+productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  crete(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryByProduct(+id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
