import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/logger/logger.module';
import { RoleEntity } from 'src/role/entities/role.entity';
import { RoleModule } from 'src/role/role.module';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([UserEntity, RoleEntity]),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserProfile, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
