import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/product/dto/product-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class CardResponseDto {
  @AutoMap()
  @ApiResponseProperty()
  id: string;

  @AutoMap(() => ProductResponseDto)
  @ApiResponseProperty({
    type: ProductResponseDto,
  })
  product: ProductResponseDto;

  @AutoMap(() => UserResponseDto)
  @ApiResponseProperty({
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @AutoMap()
  @ApiResponseProperty({
    type: Number,
  })
  quantity: number;

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
