import { AutoMap } from '@automapper/classes';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { UserEntity } from 'src/user/entities/user.entity';
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

  @Column({
    type: 'uuid',
  })
  categoryId: string;

  @AutoMap()
  @ManyToOne(() => CategoryEntity, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @Column({
    type: 'uuid',
  })
  sellerId: string;

  @AutoMap()
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'sellerId' })
  seller: UserEntity;

  @AutoMap()
  @Column({
    type: Boolean,
    default: false,
  })
  isDelete: boolean;
}
