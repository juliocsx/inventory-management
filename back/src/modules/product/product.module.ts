import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { ProductType } from '../productType/productType.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductType]), UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
