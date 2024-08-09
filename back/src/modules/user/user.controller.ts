import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UserQuery } from './user.types';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<object> {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: UserQuery) {
    return await this.userService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateById(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async softDeleteById(@Param('id') id: string) {
    return await this.userService.softDeleteById(id);
  }
}
