import { AutoMap } from '@automapper/classes';
import { Max } from 'class-validator';
import { ProvinceEnity } from 'src/province/entities/province.entity';
import { UnitEntity } from 'src/unit/entities/unit.entity';
import { WardEntity } from 'src/ward/entities/ward.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'district',
})
export class DistrictEntity {
  @AutoMap()
  @PrimaryColumn({ type: String })
  @Max(20)
  code: string;

  @AutoMap()
  @Column({ type: String })
  name: string;

  @AutoMap()
  @Column({ type: String })
  nameEn: string;

  @AutoMap()
  @Column({ type: String })
  fullName: string;

  @AutoMap()
  @Column({ type: String })
  fullNameEn: string;

  @AutoMap()
  @Column({ type: String })
  codeName: string;

  @Column()
  @Max(20)
  provinceCode: string;

  @ManyToOne(() => ProvinceEnity, { eager: true })
  @JoinColumn({ name: 'provinceCode' })
  province: ProvinceEnity;

  @ManyToOne(() => UnitEntity)
  unit: UnitEntity;

  @OneToMany(() => WardEntity, (district) => district.district)
  wards: WardEntity[];
}
