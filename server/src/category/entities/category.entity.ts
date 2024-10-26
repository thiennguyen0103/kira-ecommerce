import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'category',
})
export class CategoryEntity extends AbstractEntity {
  @AutoMap()
  @Column({
    type: String,
  })
  @Index()
  name: string;

  @AutoMap()
  @Column({
    type: String,
  })
  image?: string | null;

  @AutoMap()
  @Column({
    type: String,
  })
  slug: string;
}
