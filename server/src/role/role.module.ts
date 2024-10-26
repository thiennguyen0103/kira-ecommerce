import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleEntity } from './entities/role.entity';
import { RoleController } from './role.controller';
import { RoleProfile } from './role.profile';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService, RoleProfile, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
