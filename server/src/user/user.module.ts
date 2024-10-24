import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleModule } from 'src/role/role.module';
import { UserDocument, UserSchema } from './entities/user.schema';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserProfile],
  exports: [UserService],
})
export class UserModule {}
