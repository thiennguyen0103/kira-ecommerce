import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WardEntity } from './entities/ward.entity';
import { WardController } from './ward.controller';
import { WardProfile } from './ward.profile';
import { WardService } from './ward.service';

@Module({
  imports: [DatabaseModule.forFeature([WardEntity])],
  controllers: [WardController],
  providers: [WardService, WardProfile],
  exports: [WardService, WardProfile],
})
export class WardModule {}
