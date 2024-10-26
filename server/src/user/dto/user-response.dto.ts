import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
    type: Boolean,
  })
  @IsBoolean()
  isActive: boolean;

  @Exclude({ toPlainOnly: true })
  @AutoMap()
  password: string;

  @AutoMap(() => RoleResponseDto)
  @ApiResponseProperty({
    type: RoleResponseDto,
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
