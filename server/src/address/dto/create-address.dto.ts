import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  addressLine: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  wardCode: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  districtCode: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  provinceCode: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  cityId: number;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isDefault: boolean;
}
