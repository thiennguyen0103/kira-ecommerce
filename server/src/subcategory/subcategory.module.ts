import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SubcategoryEntity } from './entities/subcategory.entity';
import { SubcategoryProfile } from './subcategory.profile';

@Module({
  imports: [DatabaseModule.forFeature([SubcategoryEntity])],
  providers: [SubcategoryProfile],
  exports: [SubcategoryProfile],
})
export class SubcategoryModule {}
