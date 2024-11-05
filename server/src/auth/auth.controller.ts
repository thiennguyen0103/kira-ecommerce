import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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

  @SerializeOptions({
    groups: ['me'],
  })
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  me(@Req() req) {
    return this.authService.me(req.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
