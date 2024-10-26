import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const clonedPayload = {
      ...createUserDto,
    };

    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Email already exists',
      });
    }

    const role = await this.roleRepository.findById(createUserDto.roleId);
    if (!role) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User cannot created',
      });
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    clonedPayload.password = password;

    const user = await this.userRepository.create({
      ...clonedPayload,
      roleId: role.id,
    });

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User cannot created',
      });
    }

    return this.mapper.map(user, UserEntity, UserResponseDto);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return this.mapper.mapArray(users, UserEntity, UserResponseDto);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User not found',
      });
    }

    return this.mapper.map(user, UserEntity, UserResponseDto);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User not found',
      });
    }
    return this.mapper.map(user, UserEntity, UserResponseDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return this.mapper.map(updatedUser, UserEntity, UserResponseDto);
  }

  async remove(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User not found',
      });
    }
    return this.userRepository.remove(id);
  }
}
