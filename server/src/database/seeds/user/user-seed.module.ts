import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserSeedService } from './user-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
