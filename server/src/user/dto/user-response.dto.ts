import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { RoleResponseDto } from 'src/role/dto/role-response.dto';

export class UserResponseDto {
  @AutoMap()
  @ApiResponseProperty()
  id: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  name: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  image?: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  phoneNumber?: string;

  @AutoMap()
  @ApiResponseProperty({
    type: Boolean,
  })
  @IsBoolean()
  @Expose({
    groups: ['admin', 'me'],
  })
  isActive: boolean;

  @Exclude({ toPlainOnly: true })
  @AutoMap()
  password: string;

  @AutoMap(() => RoleResponseDto)
  @ApiResponseProperty({
    type: RoleResponseDto,
  })
  @Expose({
    groups: ['admin', 'me'],
  })
  role: RoleResponseDto;

  @AutoMap()
  @ApiResponseProperty({
    type: Date,
  })
  createdAt: Date;

  @AutoMap()
  @ApiResponseProperty({
    type: Date,
  })
  updatedAt: Date;

  @AutoMap()
  @ApiResponseProperty({
    type: Date,
  })
  deletedAt: Date;
}
