import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProvinceResponseDto } from './dto/province-response.dto';
import { ProvinceEnity } from './entities/province.entity';

@Injectable()
export class ProvinceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ProvinceEnity, ProvinceResponseDto);
      createMap(mapper, ProvinceResponseDto, ProvinceEnity);
    };
  }
}
