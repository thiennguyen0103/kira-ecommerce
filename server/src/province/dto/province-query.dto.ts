import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProvinceQueryDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  q: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  cityId: number;
}
