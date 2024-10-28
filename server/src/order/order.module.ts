import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { OrderItemModule } from 'src/order-item/order-item.module';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderProfile } from './order.profile';
import { OrderService } from './order.service';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule.forFeature([OrderEntity]),
    OrderItemModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderProfile],
  exports: [OrderService, OrderProfile],
})
export class OrderModule {}
