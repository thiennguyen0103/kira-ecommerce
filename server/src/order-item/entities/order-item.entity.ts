import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/database/abstract.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({
  name: 'orderItem',
})
export class OrderItemEntity extends AbstractEntity {
  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @AutoMap()
  @ManyToOne(() => ProductEntity, { eager: true })
  product: ProductEntity;

  @AutoMap()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @AutoMap()
  @Column({
    type: Number,
  })
  quantity: number;
}
