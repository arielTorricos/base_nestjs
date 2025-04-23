import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { loginDto } from './auth.dto';

@ApiTags('[auth] autenticacion'.toUpperCase())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() body: loginDto) {
    return this.authService.login(body);
  }
}
