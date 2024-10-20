import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Types } from 'mongoose';
import { RoleDocument } from 'src/role/entities/role.schema';
import { UserService } from 'src/user/user.service';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto, role: RoleEnum) {
    return this.userService.create({
      ...authRegisterDto,
      role,
    });
  }

  async login(authLoginDto: AuthLoginDto, res: Response) {
    const user = await this.userService.findOneByEmail(authLoginDto.email);

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
      id: user._id,
      role: user.role,
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
      user,
    };
  }

  private async getTokensData(data: {
    id: Types.ObjectId;
    role: RoleDocument;
  }) {
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
