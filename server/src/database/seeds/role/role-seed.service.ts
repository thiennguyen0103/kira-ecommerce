import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role/entities/role.entity';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async run() {
    const admin = await this.roleRepository.findOne({
      where: { name: RoleEnum.Admin },
    });
    if (!admin) {
      const data = this.roleRepository.create({
        name: RoleEnum.Admin,
      });
      await data.save();
    }

    const client = await this.roleRepository.findOne({
      where: { name: RoleEnum.Client },
    });
    if (!client) {
      const data = this.roleRepository.create({
        name: RoleEnum.Client,
      });

      await data.save();
    }

    const seller = await this.roleRepository.findOne({
      where: { name: RoleEnum.Seller },
    });
    if (!seller) {
      const data = this.roleRepository.create({
        name: RoleEnum.Seller,
      });

      await data.save();
    }
  }
}
