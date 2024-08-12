import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { CreateProductDto } from './dtos/create-product.dto';
  import { ProductService } from './product.service';
  import { ProductQuery } from './product.types';
  import { UpdateProductDto } from './dtos/update-product.dto';
  
  @Controller('products')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Post()
    async create(@Body() body: CreateProductDto): Promise<object> {
      return await this.productService.create(body);
    }
  
    @Get()
    async findAll(@Query() query: ProductQuery) {
      return await this.productService.findAll(query);
    }
  
    @Patch('/:id')
    async updateById(@Param('id') id: string, @Body() body: UpdateProductDto) {
      return await this.productService.updateById(id, body);
    }
  
    @Delete('/:id')
    async softDeleteById(@Param('id') id: string) {
      return await this.productService.softDeleteById(id);
    }
  }
  