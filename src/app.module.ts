import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { UserModule } from './modules/user/user.module';
import { ProductTypeModule } from './modules/productType/productType.module';
import { ProductModule } from './modules/product/product.module';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UserModule,
    ProductTypeModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
