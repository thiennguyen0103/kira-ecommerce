import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { CityResponseDto } from 'src/city/dto/city-response.dto';
import { DistrictResponseDto } from 'src/district/dto/distric-response.dto';
import { ProvinceResponseDto } from 'src/province/dto/province-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { WardResponseDto } from 'src/ward/dto/ward-response.dto';

export class AddressResponseDto {
  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsUUID()
  id: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  addressLine: string;

  @AutoMap(() => UserResponseDto)
  @ApiResponseProperty({
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @AutoMap(() => WardResponseDto)
  @ApiResponseProperty({
    type: WardResponseDto,
  })
  ward: WardResponseDto;

  @AutoMap(() => DistrictResponseDto)
  @ApiResponseProperty({
    type: DistrictResponseDto,
  })
  district: DistrictResponseDto;

  @AutoMap(() => ProvinceResponseDto)
  @ApiResponseProperty({
    type: ProvinceResponseDto,
  })
  province: ProvinceResponseDto;

  @AutoMap(() => CityResponseDto)
  @ApiResponseProperty({
    type: CityResponseDto,
  })
  city: CityResponseDto;

  @AutoMap()
  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  isDefault: boolean;

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
}
