import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RoleService } from 'src/role/role.service';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    @InjectModel(UserDocument.name)
    private readonly model: Model<UserDocument>,
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

    return this.userRepository.create({
      ...createUserDto,
      isActive: true,
      password: await bcrypt.hash(createUserDto.password, 10),
      role: clientRole,
    });
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: string) {
    return this.userRepository.findOne(
      {
        _id: id,
      },
      {
        path: 'role',
      },
    );
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
