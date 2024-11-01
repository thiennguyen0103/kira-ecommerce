import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegionEntity } from './entities/region.entity';

@Module({
  imports: [DatabaseModule.forFeature([RegionEntity])],
})
export class RegionModule {}
