import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Entity, Index } from 'typeorm';

@Entity()
@Index(['price', 'stock'])
export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @Index()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
