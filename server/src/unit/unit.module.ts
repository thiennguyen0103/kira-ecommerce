import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UnitEntity } from './entities/unit.entity';

@Module({
  imports: [DatabaseModule.forFeature([UnitEntity])],
})
export class UnitModule {}
