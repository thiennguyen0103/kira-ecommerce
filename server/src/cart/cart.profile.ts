import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CartResponseDto } from './dto/cart-response.dto';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CartEntity, CartResponseDto);
    };
  }
}
