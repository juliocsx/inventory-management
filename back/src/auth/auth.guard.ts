import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/user/user.schema';
import { UserService } from 'src/modules/user/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  private readonly secret = process.env.SECRET_KEY;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const token = req.headers.authorization?.split(' ')[1];
      const tokenType = req.headers.authorization?.split(' ')[0].toLowerCase();

      if (!token) {
        throw new HttpException('Token required', HttpStatus.UNAUTHORIZED);
      }

      if (tokenType !== 'bearer') {
        throw new HttpException('Wrong token type', HttpStatus.UNAUTHORIZED);
      }

      const decoded: null | jwt.JwtPayload | string = jwt.verify(
        token,
        this.secret,
      );

      if (!decoded) {
        throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
      }

      if (typeof decoded === 'string') {
        throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.userService.findOne({ email: decoded.email });
      if (!user) {
        throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
      }

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
