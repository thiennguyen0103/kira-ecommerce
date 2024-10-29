import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  quantity: number;
}
