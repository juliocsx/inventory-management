import { Module } from '@nestjs/common';
import { ProductTypeController } from './productType.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductType } from './productType.schema';
import { ProductTypeService } from './productType.service';

@Module({
  imports: [SequelizeModule.forFeature([ProductType])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  exports: [],
})
export class ProductTypeModule {}
