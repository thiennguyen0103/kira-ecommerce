import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DistrictController } from './district.controller';
import { DistrictProfile } from './district.profile';
import { DistrictService } from './district.service';
import { DistrictEntity } from './entities/district.entity';

@Module({
  imports: [DatabaseModule.forFeature([DistrictEntity])],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictProfile],
  exports: [DistrictService, DistrictProfile],
})
export class DistrictModule {}
