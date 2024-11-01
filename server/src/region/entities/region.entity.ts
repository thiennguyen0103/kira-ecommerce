import { AutoMap } from '@automapper/classes';
import { ProvinceEnity } from 'src/province/entities/province.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'region',
})
export class RegionEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: String })
  name: string;

  @AutoMap()
  @Column({ type: String })
  nameEn: string;

  @AutoMap()
  @Column({ type: String })
  codeName: string;

  @AutoMap()
  @Column({ type: String })
  codeNameEn: string;

  @OneToMany(() => ProvinceEnity, (province) => province.region)
  provinces: ProvinceEnity[];
}
