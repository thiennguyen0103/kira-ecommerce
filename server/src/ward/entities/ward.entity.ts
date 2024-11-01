import { AutoMap } from '@automapper/classes';
import { Max } from 'class-validator';
import { DistrictEntity } from 'src/district/entities/district.entity';
import { UnitEntity } from 'src/unit/entities/unit.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'ward',
})
export class WardEntity
{
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
  districtCode: string;

  @AutoMap()
  @ManyToOne(() => DistrictEntity)
  @JoinColumn({ name: 'provinceCode' })
  district: DistrictEntity;

  @AutoMap()
  @ManyToOne(() => UnitEntity)
  unit: UnitEntity;
}
