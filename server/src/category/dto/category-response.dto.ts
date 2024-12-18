import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID } from 'class-validator';
import { SubcategoryResponseDto } from 'src/subcategory/dto/subcategory-response.dto';

export class CategoryResponseDto {
  @AutoMap()
  @ApiResponseProperty()
  @IsUUID()
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
  description?: string | null;

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

  @AutoMap(() => [SubcategoryResponseDto])
  @ApiResponseProperty({
    type: [SubcategoryResponseDto],
  })
  @IsArray()
    @Type(() => SubcategoryResponseDto)
  subcategories: SubcategoryResponseDto[];
}
