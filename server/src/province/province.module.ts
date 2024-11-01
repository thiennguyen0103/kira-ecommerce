import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProvinceEnity } from './entities/province.entity';
import { ProvinceController } from './province.controller';
import { ProvinceProfile } from './province.profile';
import { ProvinceService } from './province.service';

@Module({
  imports: [DatabaseModule.forFeature([ProvinceEnity])],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceProfile],
  exports: [ProvinceService, ProvinceProfile],
})
export class ProvinceModule {}
