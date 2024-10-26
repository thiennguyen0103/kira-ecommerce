import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    const newUserEntity = this.userRepository.create(data);
    const newEntity = await this.userRepository.save(newUserEntity);
    return newEntity;
  }

  async find() {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity> {
    const entity = await this.userRepository.findOneBy({
      id,
    });
    return entity;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = await this.userRepository.findOneBy({
      email,
    });
    return entity;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User not found',
      });
    }
    const updatedUser = this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
