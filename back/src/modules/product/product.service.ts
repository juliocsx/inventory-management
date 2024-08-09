import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductQuery } from './product.types';
import { Op } from 'sequelize';
import { ResponseDto } from 'src/shared/types/response.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductType } from '../productType/productType.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductType) private productTypeModel: typeof ProductType,
  ) {}
  public async create(
    data: CreateProductDto,
  ): Promise<ResponseDto<Product>> {
    try {
      const productTypeExists = await this.productTypeModel.findOne({
        where: { id: data.product_type_id },
      });
      if (!productTypeExists) {
        throw new HttpException(
          'Product type does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const product = await this.productModel.create({
        expiration_date: data.expiration_date,
        product_type_id: data.product_type_id,
        quantity: data.quantity
      });

      return {
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async findAll(
    query: ProductQuery,
  ): Promise<ResponseDto<Product[]>> {
    try {
      const { expiration_date, product_type_id, id } = query;

      let productWhereStatement: any = {};

      if (product_type_id) {
        productWhereStatement.product_type_id = product_type_id
      }

      if (expiration_date) {
        productWhereStatement.expiration_date = expiration_date;
      }

      if (id) {
        productWhereStatement.id = id;
      }

      const products = await this.productModel.findAll({
        where: productWhereStatement,
      });

      const message: string = products.length === 0 ? 'No products found' : 'Products found successfully';

      return {
        message: message,
        data: products,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async updateById(
    id: string,
    data: UpdateProductDto,
  ): Promise<ResponseDto<Product>> {
    try {
      const product = await this.productModel.findByPk(id);

      if (!product) {
        throw new HttpException('Product type not found', HttpStatus.NOT_FOUND);
      }

      if (data.product_type_id) {
        const productTypeIdExists = await this.productTypeModel.findOne({
          where: { id: data.product_type_id },
        });

        if (!productTypeIdExists) {
          throw new HttpException(
            'Product type does not exist',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await this.productModel.update(
        { ...data },
        { where: { id }, returning: true },
      );

      const productUpdated = await this.productModel.findByPk(id);

      return {
        message: 'Product updated successfully',
        data: productUpdated,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async softDeleteById(id: string): Promise<ResponseDto<void>> {
    try {
      const product = await this.productModel.findByPk(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      product.destroy();

      return {
        message: 'Product deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
