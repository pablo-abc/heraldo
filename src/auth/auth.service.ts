import { Injectable, ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResponseToken } from './interfaces/response-token.interface';

@Injectable()
export class AuthService {
  validateCreateUser(req, createUserDto: CreateUserDto): boolean {
    try {
      if (!createUserDto.roles) return true;
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.decode(token);
      return user.roles.includes('admin');
    } catch (err) {
      return false;
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<ResponseToken> {
    try {
      const { iat, exp, ...token } = jwt.verify(refreshTokenDto.refresh_token, process.env.REFRESH_SECRET);
      const accessToken = jwt.sign(token, process.env.SECRET, { expiresIn: Number(process.env.ACCESS_TOKEN_EXP) });
      const refreshToken = jwt.sign(token, process.env.SECRET, { expiresIn: Number(process.env.REFRESH_TOKEN_EXP) });
      return {
        access_token: accessToken,
        expires_in: Number(process.env.ACCESS_TOKEN_EXP),
        token_type: 'Bearer',
        refresh_token: refreshToken,
      };
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
