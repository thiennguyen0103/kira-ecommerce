import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProvinceResponseDto {
  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  code: string;

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
  @IsString()
  nameEn: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  fullName: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  fullNameEn: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  codeName: string;
}
