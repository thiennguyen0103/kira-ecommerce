import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrderItemResponseDto } from './dto/order-item-response.dto';
import { OrderItemEntity } from './entities/order-item.entity';

@Injectable()
export class OrderItemProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OrderItemEntity, OrderItemResponseDto);
      createMap(mapper, OrderItemResponseDto, OrderItemEntity);
    };
  }
}
