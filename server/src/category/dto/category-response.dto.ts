import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryResponseDto {
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
  @IsString()
  image?: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsString()
  slug: string;
}
