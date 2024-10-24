import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        ProductDocument,
        ProductResponseDto,
        forMember(
          (u) => u.id,
          mapFrom((u) => u._id),
        ),
      );
    };
  }
}
