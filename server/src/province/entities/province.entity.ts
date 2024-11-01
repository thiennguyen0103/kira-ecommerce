import { AutoMap } from '@automapper/classes';
import { Max } from 'class-validator';
import { CityEntity } from 'src/city/entities/city.entity';
import { DistrictEntity } from 'src/district/entities/district.entity';
import { RegionEntity } from 'src/region/entities/region.entity';
import { UnitEntity } from 'src/unit/entities/unit.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'province',
})
export class ProvinceEnity {
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

  @AutoMap()
  @ManyToOne(() => UnitEntity, { eager: true })
  unit: UnitEntity;

  @AutoMap()
  @ManyToOne(() => RegionEntity, { eager: true })
  region: RegionEntity;

  @AutoMap()
  @ManyToOne(() => CityEntity)
  city: CityEntity;

  @AutoMap()
  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts: DistrictEntity[];
}
