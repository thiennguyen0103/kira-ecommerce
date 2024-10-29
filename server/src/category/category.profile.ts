import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { SubcategoryResponseDto } from 'src/subcategory/dto/subcategory-response.dto';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CategoryEntity,
        CategoryResponseDto,
        forMember(
          (u) => u.subcategories,
          mapFrom((u) =>
            this.mapper.mapArray(
              u.subcategories,
              SubcategoryEntity,
              SubcategoryResponseDto,
            ),
          ),
        ),
      );
      createMap(mapper, CategoryResponseDto, CategoryEntity);
    };
  }
}
