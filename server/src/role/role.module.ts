import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleDocument, RoleSchema } from './entities/role.schema';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: RoleDocument.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
