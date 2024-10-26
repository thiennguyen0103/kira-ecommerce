import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RoleResponseDto } from './dto/role-response.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, RoleEntity, RoleResponseDto);
      createMap(mapper, RoleResponseDto, RoleEntity);
    };
  }
}
