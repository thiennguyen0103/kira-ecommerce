import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
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
  description?: string;

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
  @IsOptional()
  slug?: string;

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
  @IsUUID()
  subcategoryId: string;
}
