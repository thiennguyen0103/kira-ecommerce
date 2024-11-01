import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DistrictResponseDto } from './dto/distric-response.dto';
import { DistrictEntity } from './entities/district.entity';

@Injectable()
export class DistrictProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, DistrictEntity, DistrictResponseDto);
      createMap(mapper, DistrictResponseDto, DistrictEntity);
    };
  }
}
