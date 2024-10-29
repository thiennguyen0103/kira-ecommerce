import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  quantity: number;
}
