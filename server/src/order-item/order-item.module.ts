import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { ProductModule } from 'src/product/product.module';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderItemProfile } from './order-item.profile';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule.forFeature([OrderItemEntity]),
    ProductModule,
  ],
  providers: [OrderItemService, OrderItemProfile],
  exports: [OrderItemService, OrderItemProfile],
})
export class OrderItemModule {}
