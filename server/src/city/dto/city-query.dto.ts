import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CityQueryDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  q: string;
}
