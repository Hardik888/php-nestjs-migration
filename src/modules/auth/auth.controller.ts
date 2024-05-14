import { Body, Controller, Post } from '@nestjs/common';
import { Login } from './types/logindetail.type';
import { AuthService } from './auth.service';
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: Login) {
    return;
  }
}
