import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductProfile } from './product.profile';
import { ProductService } from './product.service';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([ProductEntity, UserEntity, CategoryEntity]),
    UserModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductProfile],
  exports: [ProductService],
})
export class ProductModule {}
