import { AutoMap } from '@automapper/classes';
import { Exclude, Expose } from 'class-transformer';
import { AddressEntity } from 'src/address/entities/address.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends AbstractEntity {
  @AutoMap()
  @Column({
    type: String,
  })
  name: string;

  @AutoMap()
  @Column({
    type: String,
    unique: true,
  })
  @Index()
  email: string;

  @AutoMap()
  @Column({
    type: String,
  })
  @Exclude()
  password: string;

  @AutoMap()
  @Column({
    type: String,
    nullable: true,
  })
  image?: string | null;

  @AutoMap()
  @Column({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'uuid',
  })
  roleId: string;

  @AutoMap()
  @Expose({ groups: ['me', 'admin'] })
  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @AutoMap()
  @Expose({ groups: ['me', 'admin'] })
  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity;
}
