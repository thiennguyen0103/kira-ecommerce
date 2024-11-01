import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class WardQueryDto {
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
  @MaxLength(20)
  districtCode: string;
}
