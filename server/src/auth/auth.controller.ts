import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';

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
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  registerClient(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto, RoleEnum.Client);
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.Admin)
  @Post('/register/admin')
  @HttpCode(HttpStatus.CREATED)
  registerAdmin(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto, RoleEnum.Admin);
  }
}
