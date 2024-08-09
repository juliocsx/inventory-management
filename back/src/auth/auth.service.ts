import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/user/user.schema';
import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { ResponseDto } from 'src/shared/types/response.dto';
import { LoginData } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userInfo: LoginDto): Promise<ResponseDto<LoginData>> {
    try {
      const { email, password } = userInfo;
      const user: User = await this.userService.findOne({ email: email });

      if (!user) {
        throw new HttpException(
          'Email or password is wrong',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new HttpException(
          'Email or password is wrong',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        message: 'User logged in successfully',
        data: {
          token: token,
          user: user,
        },
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
