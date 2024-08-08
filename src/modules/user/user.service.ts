import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserQuery } from './user.types';
import { Op } from 'sequelize';
import { ResponseDto } from 'src/shared/types/response.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  public async create(data: CreateUserDto): Promise<ResponseDto<User>> {
    try {
      const emailAlreadyExists = await this.userModel.findOne({
        where: { email: data.email },
      });
      if (emailAlreadyExists) {
        throw new HttpException(
          'User email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      return {
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async findAll(query: UserQuery): Promise<ResponseDto<User[]>> {
    try {
      const { name, email, id } = query;

      let userWhereStatement: any = {};

      if (name) {
        userWhereStatement.name = {
          [Op.like]: `%${name}%`,
        };
      }

      if (email) {
        userWhereStatement.email = {
          [Op.like]: `%${email}%`,
        };
      }

      if (id) {
        userWhereStatement.id = id;
      }

      const users = await this.userModel.findAll({ where: userWhereStatement });

      if (users.length === 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Users found successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async updateById(
    id: string,
    data: UpdateUserDto,
  ): Promise<ResponseDto<User>> {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (data.email) {
        const emailAlreadyExists = await this.userModel.findOne({
          where: { email: data.email },
        });

        if (emailAlreadyExists) {
          throw new HttpException(
            'Invalid email. Email already exists or is bad format',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await this.userModel.update(
        { ...data },
        { where: { id }, returning: true },
      );

      const userUpdated = await this.userModel.findByPk(id);

      return {
        message: 'User updated successfully',
        data: userUpdated,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async softDeleteById(id: string): Promise<ResponseDto<void>> {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      user.destroy();
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
