import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RoleDocument } from 'src/role/entities/role.schema';
import { UserDocument } from 'src/user/entities/user.schema';
import { RoleEnum } from 'src/utils/enums/roles.enum';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(RoleDocument.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async run() {
    const adminRole = await this.roleModel.findOne({ name: RoleEnum.Admin });

    if (!adminRole) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Role not found',
      });
    }

    const admin = await this.userModel.findOne({
      email: 'admin@example.com',
    });

    if (!admin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('admin123', salt);
      const data = new this.userModel({
        name: 'admin',
        email: 'admin@example.com',
        password,
        role: adminRole,
      });

      await data.save();
    }
  }
}
