import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RoleResponseDto } from './dto/role-response.dto';
import { RoleDocument } from './entities/role.schema';

@Injectable()
export class RoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        RoleDocument,
        RoleResponseDto,
        forMember(
          (u) => u.id,
          mapFrom((u) => u._id),
        ),
      );
    };
  }
}
