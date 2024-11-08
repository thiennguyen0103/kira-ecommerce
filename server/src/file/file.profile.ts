import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FileResponseDto } from './dto/file-response.dto';
import { FileEntity } from './entities/file.entity';
@Injectable()
export class FileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, FileEntity, FileResponseDto);
    };
  }
}
