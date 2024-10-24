import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { CategoryController } from './category.controller';
import { CategoryProfile } from './category.profile';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryDocument, CategorySchema } from './entities/category.entity';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: CategoryDocument.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryProfile],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
