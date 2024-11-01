import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
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
    type: Number,
  })
  @IsBoolean()
  @IsOptional()
  isDefault: boolean;
}
