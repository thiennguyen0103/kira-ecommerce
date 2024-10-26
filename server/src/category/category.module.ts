import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { CategoryController } from './category.controller';
import { CategoryProfile } from './category.profile';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([CategoryEntity]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryProfile],
  exports: [CategoryService],
})
export class CategoryModule {}
