import { AutoMap } from '@automapper/classes';
import { DistrictEntity } from 'src/district/entities/district.entity';
import { ProvinceEnity } from 'src/province/entities/province.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'unit',
})
export class UnitEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: String })
  fullName: string;

  @AutoMap()
  @Column({ type: String })
  fullNameEn: string;

  @AutoMap()
  @Column({ type: String })
  shortName: string;

  @AutoMap()
  @Column({ type: String })
  shortNameEn: string;

  @AutoMap()
  @Column({ type: String })
  codeName: string;

  @AutoMap()
  @Column({ type: String })
  codeNameEn: string;

  @OneToMany(() => ProvinceEnity, (province) => province.unit)
  provinces: ProvinceEnity[];

  @OneToMany(() => DistrictEntity, (district) => district.unit)
  districts: DistrictEntity[];
}
