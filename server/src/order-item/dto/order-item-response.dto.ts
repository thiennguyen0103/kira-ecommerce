import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';
import { ProductResponseDto } from 'src/product/dto/product-response.dto';

export class OrderItemResponseDto {
  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsUUID()
  id: string;

  @AutoMap()
  @ApiResponseProperty({
    type: ProductResponseDto,
  })
  product: ProductResponseDto;

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  @IsNumber()
  price: number;

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  quantity: number;
}
