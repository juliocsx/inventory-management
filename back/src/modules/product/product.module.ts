import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { ProductType } from '../productType/productType.schema';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductType])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
