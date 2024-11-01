import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { DatabaseModule } from './database/database.module';
import { DistrictModule } from './district/district.module';
import { LoggerModule } from './logger/logger.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { ProvinceModule } from './province/province.module';
import { RegionModule } from './region/region.module';
import { RoleModule } from './role/role.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { UnitModule } from './unit/unit.module';
import { UserModule } from './user/user.module';
import { WardModule } from './ward/ward.module';

import authConfig from './auth/config/auth.config';
import appConfig from './config/app-config';
import databaseConfig from './database/config/database-config';
import paymentConfig from './payment/config/payment-config';

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
    AddressModule,
    RegionModule,
    UnitModule,
    ProvinceModule,
    WardModule,
    DistrictModule,
    CityModule,
  ],
})
export class AppModule {}
