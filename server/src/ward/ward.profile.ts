import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { WardResponseDto } from './dto/ward-response.dto';
import { WardEntity } from './entities/ward.entity';

@Injectable()
export class WardProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, WardEntity, WardResponseDto);
      createMap(mapper, WardResponseDto, WardEntity);
    };
  }
}
