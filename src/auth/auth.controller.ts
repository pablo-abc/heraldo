import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResponseToken } from './interfaces/response-token.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('oauth')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<ResponseToken> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
