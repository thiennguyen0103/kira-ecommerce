import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  quantity: number;
}
