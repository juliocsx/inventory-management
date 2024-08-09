import { Module } from '@nestjs/common';
import { ProductTypeController } from './productType.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductType } from './productType.schema';
import { ProductTypeService } from './productType.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([ProductType]), UserModule],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  exports: [],
})
export class ProductTypeModule {}
