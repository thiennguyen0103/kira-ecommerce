import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { UserDocument } from './entities/user.schema';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        UserDocument,
        UserResponseDto,
        forMember(
          (u) => u.id,
          mapFrom((u) => u._id),
        ),
      );
    };
  }
}
