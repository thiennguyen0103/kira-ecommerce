import { Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/utils/enums/roles.enum';
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

  findByName(name: RoleEnum) {
    return this.roleRepository.findByName(name);
  }
}
