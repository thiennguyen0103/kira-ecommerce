import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CityResponseDto {
  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  @IsNumber()
  id: number;

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
}
