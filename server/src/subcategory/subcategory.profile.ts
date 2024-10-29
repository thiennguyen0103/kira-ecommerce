import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { SubcategoryResponseDto } from './dto/subcategory-response.dto';
import { SubcategoryEntity } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, SubcategoryEntity, SubcategoryResponseDto);
      createMap(mapper, SubcategoryResponseDto, SubcategoryEntity);
    };
  }
}
