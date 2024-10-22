import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserDocument } from './entities/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Email already exists',
      });
    }

    const clientRole = await this.roleService.findOneByName(RoleEnum.Client);
    if (!clientRole) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User cannot created',
      });
    }

    const user = await this.userRepository.create({
      ...createUserDto,
      isActive: true,
      password: await bcrypt.hash(createUserDto.password, 10),
      role: clientRole,
    });

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User cannot created',
      });
    }

    return this.mapper.map(user, UserDocument, UserResponseDto);
  }

  async findAll() {
    const users = await this.userRepository.find({});

    return this.mapper.mapArray(users, UserDocument, UserResponseDto);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(
      {
        _id: id,
      },
      {
        path: 'role',
      },
    );

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User not found',
      });
    }

    return this.mapper.map(user, UserDocument, UserResponseDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      email,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.findOneAndDelete({ _id: id });
  }
}
