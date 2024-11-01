import { AutoMap } from '@automapper/classes';
import { ProvinceEnity } from 'src/province/entities/province.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'city',
})
export class CityEntity {
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
  @OneToMany(() => ProvinceEnity, (province) => province.city)
  provinces: ProvinceEnity[];
}
