import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DistrictQueryDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  q: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  provinceCode: string;
}
