import { AutoMap } from '@automapper/classes';
import { IsBoolean } from 'class-validator';
import { CityEntity } from 'src/city/entities/city.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { DistrictEntity } from 'src/district/entities/district.entity';
import { ProvinceEnity } from 'src/province/entities/province.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { WardEntity } from 'src/ward/entities/ward.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'address',
})
export class AddressEntity extends AbstractEntity {
  @AutoMap()
  @Column({
    type: String,
  })
  addressLine: string;

  @Column({ type: 'uuid' })
  userId: string;

  @AutoMap()
  @ManyToOne(() => UserEntity, (user) => user.addresses, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: String })
  wardCode: string;

  @AutoMap()
  @ManyToOne(() => WardEntity, { eager: true })
  @JoinColumn({ name: 'wardCode' })
  ward: WardEntity;

  @Column({ type: String })
  districtCode: string;

  @AutoMap()
  @ManyToOne(() => DistrictEntity, { eager: true })
  @JoinColumn({ name: 'districtCode' })
  district: DistrictEntity;

  @Column({ type: String })
  provinceCode: string;

  @AutoMap()
  @ManyToOne(() => ProvinceEnity, { eager: true })
  @JoinColumn({ name: 'provinceCode' })
  province: ProvinceEnity;

  @Column({ type: Number })
  cityId: number;

  @AutoMap()
  @ManyToOne(() => CityEntity, { eager: true })
  city: CityEntity;

  @AutoMap()
  @Column({
    type: Boolean,
  })
  @IsBoolean()
  isDefault: boolean;
}
