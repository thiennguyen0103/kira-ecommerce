import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OrderEntity, OrderResponseDto);
      createMap(mapper, OrderResponseDto, OrderEntity);
    };
  }
}
