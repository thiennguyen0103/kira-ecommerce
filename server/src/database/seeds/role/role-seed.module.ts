import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleDocument, RoleSchema } from 'src/role/entities/role.schema';
import { RoleSeedService } from './role-seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoleDocument.name,
        schema: RoleSchema,
      },
    ]),
  ],
  providers: [RoleSeedService],
  exports: [RoleSeedService],
})
export class RoleSeedModule {}
