import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CityResponseDto } from './dto/city-response.dto';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CityEntity, CityResponseDto);
      createMap(mapper, CityResponseDto, CityEntity);
    };
  }
}
