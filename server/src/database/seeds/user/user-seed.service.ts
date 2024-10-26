import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async run() {
    const adminRole = await this.roleRepository.findOne({
      where: { name: RoleEnum.Admin },
    });

    if (!adminRole) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Role not found',
      });
    }

    const admin = await this.userRepository.findOne({
      where: {
        email: 'admin@example.com',
      },
    });

    if (!admin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('admin123', salt);
      const data = this.userRepository.create({
        name: 'admin',
        email: 'admin@example.com',
        password,
        role: adminRole,
      });

      await data.save();
    }
  }
}
