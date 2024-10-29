import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import appConfig from './config/app-config';
import databaseConfig from './database/config/database-config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { PaymentModule } from './payment/payment.module';
import paymentConfig from './payment/config/payment-config';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, paymentConfig],
      envFilePath: ['.env'],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    LoggerModule,
    AuthModule,
    UserModule,
    RoleModule,
    CategoryModule,
    ProductModule,
    CartModule,
    PaymentModule,
    OrderModule,
    OrderItemModule,
    SubcategoryModule,
  ],
})
export class AppModule {}
