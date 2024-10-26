import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Product name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Product description',
  })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiPropertyOptional({
    type: String,
    example: 'https://example.com/image.png',
  })
  @IsString()
  @IsOptional()
  image?: string | null;

  @ApiPropertyOptional({
    type: String,
    example: 'product-slug',
    uniqueItems: true,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Type(() => String)
  categoryId: string;
}
