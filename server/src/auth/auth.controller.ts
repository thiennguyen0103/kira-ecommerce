import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() authLoginDto: AuthLoginDto, @Res({ passthrough: true }) res) {
    return this.authService.login(authLoginDto, res);
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @Post('/register/client')
  @HttpCode(HttpStatus.CREATED)
  registerClient(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto, RoleEnum.Client);
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @Post('/register/seller')
  @HttpCode(HttpStatus.CREATED)
  registerSeller(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto, RoleEnum.Seller);
  }
}
