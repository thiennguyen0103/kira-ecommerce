import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument } from 'src/role/entities/role.schema';
import { RoleEnum } from 'src/utils/enums/roles.enum';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectModel(RoleDocument.name)
    private readonly model: Model<RoleDocument>,
  ) {}

  async run() {
    const admin = await this.model.findOne({ name: RoleEnum.Admin });
    if (!admin) {
      const data = new this.model({
        name: RoleEnum.Admin,
      });

      await data.save();
    }

    const client = await this.model.findOne({ name: RoleEnum.Client });
    if (!client) {
      const data = new this.model({
        name: RoleEnum.Client,
      });

      await data.save();
    }

    const seller = await this.model.findOne({ name: RoleEnum.Seller });
    if (!seller) {
      const data = new this.model({
        name: RoleEnum.Seller,
      });

      await data.save();
    }
  }
}
