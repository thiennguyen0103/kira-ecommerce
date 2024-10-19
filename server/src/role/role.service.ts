import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleRepository } from './role.repository';
@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createUserDto: CreateRoleDto) {
    return this.roleRepository.create({
      ...createUserDto,
    });
  }

  findOneByName(name: string) {
    return this.roleRepository.findOne({
      name,
    });
  }
}
