import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { AddressResponseDto } from './dto/address-response.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, AddressEntity, AddressResponseDto);
      createMap(mapper, AddressResponseDto, AddressEntity);
    };
  }
}
