import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { RoleDocument } from './entities/role.schema';

@Injectable()
export class RoleRepository extends AbstractRepository<RoleDocument> {
  protected readonly logger: Logger;

  constructor(@InjectModel(RoleDocument.name) userModel: Model<RoleDocument>) {
    super(userModel);
  }
}
