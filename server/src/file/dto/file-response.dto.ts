import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FileResponseDto {
  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  @IsUUID()
  id: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  path: string;
}
