import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SubcategoryEntity } from './entities/subcategory.entity';
import { SubcategoryProfile } from './subcategory.profile';
import { SubcategoryService } from './subcategory.service';

@Module({
  imports: [DatabaseModule.forFeature([SubcategoryEntity])],
  providers: [SubcategoryProfile, SubcategoryService],
  exports: [SubcategoryProfile, SubcategoryService],
})
export class SubcategoryModule {}
