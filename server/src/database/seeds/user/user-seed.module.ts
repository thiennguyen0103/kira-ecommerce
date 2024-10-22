import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleDocument, RoleSchema } from 'src/role/entities/role.schema';
import { UserDocument, UserSchema } from 'src/user/entities/user.schema';
import { UserSeedService } from './user-seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoleDocument.name,
        schema: RoleSchema,
      },
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
