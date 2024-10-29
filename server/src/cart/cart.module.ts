import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { CartController } from './cart.controller';
import { CartProfile } from './cart.profile';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([CartEntity, UserEntity, ProductEntity]),
    ProductModule,
    UserModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartProfile],
  exports: [CartService],
})
export class CartModule {}
