import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductType } from './productType.schema';
import { CreateProductTypeDto } from './dtos/create-productType.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductTypeQuery } from './productType.types';
import { Op } from 'sequelize';
import { ResponseDto } from 'src/shared/types/response.dto';
import { UpdateProductTypeDto } from './dtos/update-productType.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType) private productTypeModel: typeof ProductType,
  ) {}
  public async create(
    data: CreateProductTypeDto,
  ): Promise<ResponseDto<ProductType>> {
    try {
      const describeAlreadyExists = await this.productTypeModel.findOne({
        where: { describe: data.describe },
      });
      if (describeAlreadyExists) {
        throw new HttpException(
          'Product type describe already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const productType = await this.productTypeModel.create({
        describe: data.describe,
        price: data.price,
      });

      return {
        message: 'Product type created successfully',
        data: productType,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async findAll(
    query: ProductTypeQuery,
  ): Promise<ResponseDto<ProductType[]>> {
    try {
      const { describe, price, id } = query;

      let productTypeWhereStatement: any = {};

      if (describe) {
        productTypeWhereStatement.describe = {
          [Op.like]: `%${describe}%`,
        };
      }

      if (price) {
        productTypeWhereStatement.price = price;
      }

      if (id) {
        productTypeWhereStatement.id = id;
      }

      const productTypes = await this.productTypeModel.findAll({
        where: productTypeWhereStatement,
      });

      if (productTypes.length === 0) {
        throw new HttpException('No product types found', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Product types found successfully',
        data: productTypes,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async updateById(
    id: string,
    data: UpdateProductTypeDto,
  ): Promise<ResponseDto<ProductType>> {
    try {
      const productType = await this.productTypeModel.findByPk(id);

      if (!productType) {
        throw new HttpException('Product type not found', HttpStatus.NOT_FOUND);
      }

      if (data.describe) {
        const describeAlreadyExists = await this.productTypeModel.findOne({
          where: { describe: data.describe },
        });

        if (describeAlreadyExists) {
          throw new HttpException(
            'describe already in use',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await this.productTypeModel.update(
        { ...data },
        { where: { id }, returning: true },
      );

      const productTypeUpdated = await this.productTypeModel.findByPk(id);

      return {
        message: 'Product type updated successfully',
        data: productTypeUpdated,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async softDeleteById(id: string): Promise<ResponseDto<void>> {
    try {
      const productType = await this.productTypeModel.findByPk(id);
      if (!productType) {
        throw new HttpException('Product type not found', HttpStatus.NOT_FOUND);
      }

      productType.destroy();

      return {
        message: 'Product type deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
