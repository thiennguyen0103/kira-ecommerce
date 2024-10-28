import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { OrderItemResponseDto } from 'src/order-item/dto/order-item-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { StatusEnum } from 'src/utils/enums/status.enum';

export class OrderResponseDto {
  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsUUID()
  id: string;

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  totalAmount: number;

  @AutoMap()
  @ApiResponseProperty({
    enum: StatusEnum,
  })
  status: StatusEnum;

  @AutoMap(() => UserResponseDto)
  @ApiResponseProperty({
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @AutoMap(() => OrderItemResponseDto)
  @ApiResponseProperty({
    type: [OrderItemResponseDto],
  })
  items: OrderItemResponseDto[];

  @AutoMap()
  @ApiResponseProperty({
    type: Date,
  })
  createdAt: Date;

  @AutoMap()
  @ApiResponseProperty({
    type: Date,
  })
  updatedAt: Date;
}
