import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/database/abstract.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'card',
})
export class CardEntity extends AbstractEntity {
  @Column({
    type: 'uuid',
  })
  productId: string;

  @AutoMap()
  @ManyToOne(() => ProductEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column({
    type: 'uuid',
  })
  userId: string;

  @AutoMap()
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @AutoMap()
  @Column({
    type: Number,
  })
  quantity: number;
}
