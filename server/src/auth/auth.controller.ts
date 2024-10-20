import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() authLoginDto: AuthLoginDto, @Res({ passthrough: true }) res) {
    return this.authService.login(authLoginDto, res);
  }

  @Post('/register/client')
  registerClient(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto, RoleEnum.Client);
  }

  @Post('/register/seller')
  registerSeller(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto, RoleEnum.Seller);
  }
}
