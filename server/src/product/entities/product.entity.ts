import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/database/abstract.entity';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'product',
})
export class ProductEntity extends AbstractEntity {
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
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @AutoMap()
  @Column({
    type: Number,
    default: 0,
  })
  rating: number;

  @AutoMap()
  @Column({
    type: Number,
    default: 0,
  })
  stock: number;

  @Column({
    type: 'uuid',
  })
  subcategoryId: string;

  @AutoMap()
  @ManyToOne(() => SubcategoryEntity, { eager: true })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: SubcategoryEntity;

  @AutoMap()
  @Column({
    type: Boolean,
    default: false,
  })
  isDelete: boolean;
}
