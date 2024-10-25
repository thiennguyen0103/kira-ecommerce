import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CardResponseDto } from './dto/card-response.dto';
import { CardDocument } from './entities/card.entity';

@Injectable()
export class CardProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CardDocument,
        CardResponseDto,
        forMember(
          (c) => c.id,
          mapFrom((c) => c._id),
        ),
      );
    };
  }
}
