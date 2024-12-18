import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/database/abstract.entity';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

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
    nullable: true,
  })
  @Index()
  description?: string | null;

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

  @AutoMap()
  @OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category, {
    eager: true,
  })
  subcategories: SubcategoryEntity[];
}
