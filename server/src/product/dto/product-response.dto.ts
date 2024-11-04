import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { SubcategoryResponseDto } from 'src/subcategory/dto/subcategory-response.dto';

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
  @Type(() => Number)
  price: number;

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  @IsNumber()
  rating: number;

  @AutoMap(() => SubcategoryResponseDto)
  @ApiResponseProperty({
    type: SubcategoryResponseDto,
  })
  subcategory: SubcategoryResponseDto;

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
