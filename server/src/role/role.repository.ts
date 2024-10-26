import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { DeepPartial, Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly userRepository: Repository<RoleEntity>,
  ) {}

  async create(data: DeepPartial<RoleEntity>): Promise<RoleEntity> {
    const newRoleEntity = this.userRepository.create(data);
    const newEntity = await this.userRepository.save(newRoleEntity);
    return newEntity;
  }

  async find() {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<RoleEntity> {
    const entity = await this.userRepository.findOneBy({
      id,
    });
    return entity;
  }

  async findByName(name: RoleEnum): Promise<RoleEntity> {
    const entity = await this.userRepository.findOneBy({
      name,
    });
    return entity;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
