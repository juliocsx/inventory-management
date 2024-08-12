import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { CreateProductTypeDto } from './dtos/create-productType.dto';
  import { ProductTypeService } from './productType.service';
  import { ProductTypeQuery } from './productType.types';
  import { UpdateProductTypeDto } from './dtos/update-productType.dto';
  
  @Controller('product-types')
  export class ProductTypeController {
    constructor(private readonly productTypeService: ProductTypeService) {}
  
    @Post()
    async create(@Body() body: CreateProductTypeDto): Promise<object> {
      return await this.productTypeService.create(body);
    }
  
    @Get()
    async findAll(@Query() query: ProductTypeQuery) {
      return await this.productTypeService.findAll(query);
    }
  
    @Patch('/:id')
    async updateById(@Param('id') id: string, @Body() body: UpdateProductTypeDto) {
      return await this.productTypeService.updateById(id, body);
    }
  
    @Delete('/:id')
    async softDeleteById(@Param('id') id: string) {
      return await this.productTypeService.softDeleteById(id);
    }
  }
  