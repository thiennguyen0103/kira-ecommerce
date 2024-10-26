import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CardResponseDto } from './dto/card-response.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CardEntity, CardResponseDto);
    };
  }
}
