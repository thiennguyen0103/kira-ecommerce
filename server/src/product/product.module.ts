import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/user/user.module';
import { ProductDocument, ProductSchema } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductProfile } from './product.profile';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ProductDocument.name, schema: ProductSchema },
    ]),
    UserModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductProfile],
  exports: [ProductService],
})
export class ProductModule {}
