import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    type: [CreateOrderItemDto],
  })
  @IsArray()
  items: CreateOrderItemDto[];
}
