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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UserQuery } from './user.types';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<object> {
    return await this.userService.create(body);
  }

  @Get()
  async findAll(@Query() query: UserQuery) {
    return await this.userService.findAll(query);
  }

  @Patch('/:id')
  async updateById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateById(id, body);
  }

  @Delete('/:id')
  async softDeleteById(@Param('id') id: string) {
    return await this.userService.softDeleteById(id);
  }
}
