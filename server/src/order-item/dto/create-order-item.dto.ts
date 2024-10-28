import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    type: String,
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  quantity: number;
}
