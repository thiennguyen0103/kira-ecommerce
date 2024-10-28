import { AutoMap } from '@automapper/classes';
import { IsUUID } from 'class-validator';
import { AbstractEntity } from 'src/database/abstract.entity';
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { StatusEnum } from 'src/utils/enums/status.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'order',
})
export class OrderEntity extends AbstractEntity {
  @AutoMap()
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2
  })
  totalAmount: number;

  @AutoMap()
  @Column({ enum: StatusEnum, default: StatusEnum.Pending })
  status: StatusEnum;

  @Column({
    type: 'uuid',
  })
  @IsUUID()
  userId: string;

  @AutoMap()
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity;

  @AutoMap()
  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    eager: true,
  })
  items: OrderItemEntity[];
}
