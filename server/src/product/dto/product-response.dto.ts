import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CategoryResponseDto } from 'src/category/dto/category-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class ProductResponseDto {
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
  description?: string;

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

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  @IsNumber()
  price: number;

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  @IsNumber()
  rating: number;

  @AutoMap(() => CategoryResponseDto)
  @ApiResponseProperty({
    type: CategoryResponseDto,
  })
  category: CategoryResponseDto;

  @AutoMap(() => UserResponseDto)
  @ApiResponseProperty({
    type: UserResponseDto,
  })
  seller: UserResponseDto;

  @AutoMap()
  @ApiResponseProperty({
    type: Boolean,
  })
  @IsBoolean()
  isDelete: boolean;

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
