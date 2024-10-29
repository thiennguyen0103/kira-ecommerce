import { AutoMap } from '@automapper/classes';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'subcategory',
})
export class SubcategoryEntity extends AbstractEntity {
  @Column({
    type: 'uuid',
  })
  categoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
  @JoinColumn({
    name: 'categoryId',
  })
  category: CategoryEntity;

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
}
