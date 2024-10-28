import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CategoryEntity, CategoryResponseDto);
      createMap(mapper, CategoryResponseDto, CategoryEntity);
    };
  }
}
