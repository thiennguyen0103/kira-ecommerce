import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CityController } from './city.controller';
import { CityProfile } from './city.profile';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [DatabaseModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService, CityProfile],
  exports: [CityService, CityProfile],
})
export class CityModule {}
