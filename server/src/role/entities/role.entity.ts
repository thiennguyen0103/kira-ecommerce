import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { AbstractEntity } from 'src/database/abstract.entity';

import { RoleEnum } from 'src/utils/enums/roles.enum';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'role',
})
export class RoleEntity extends AbstractEntity {
  @AutoMap()
  @Column({
    type: String,
    enum: RoleEnum,
  })
  @Type(() => String)
  name: RoleEnum;
}
