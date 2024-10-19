import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      _id: id,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.findOneAndDelete({ _id: id });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists');
  }
}
