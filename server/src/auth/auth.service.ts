import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { RoleResponseDto } from 'src/role/dto/role-response.dto';
import { RoleEntity } from 'src/role/entities/role.entity';
import { RoleRepository } from 'src/role/role.repository';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async register(authRegisterDto: AuthRegisterDto, roleName: RoleEnum) {
    const existingRole = await this.roleRepository.findByName(roleName);

    if (!existingRole) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'Cannot create user',
        },
      });
    }

    return this.userService.create({
      ...authRegisterDto,
      roleId: existingRole.id,
    });
  }

  async login(authLoginDto: AuthLoginDto, res: Response) {
    const user = await this.userService.findByEmail(authLoginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'Email or password is not corrected',
        },
      });
    }

    const isValidPassword = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'Email or password is not corrected',
        },
      });
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: this.mapper.map(user.role, RoleResponseDto, RoleEntity),
    });

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(tokenExpires),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: false,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user: this.mapper.map(user, UserEntity, UserResponseDto),
    };
  }

  private async getTokensData(data: { id: string; role: RoleEntity }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + 86400 * 1000;

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          id: data.id,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
