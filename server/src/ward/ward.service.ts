import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import
  {
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WardQueryDto } from './dto/ward-query.dto';
import { WardResponseDto } from './dto/ward-response.dto';
import { WardEntity } from './entities/ward.entity';

@Injectable()
export class WardService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(WardEntity)
    private readonly wardRepository: Repository<WardEntity>,
  ) {}

  async findAll(wardQueryDto: WardQueryDto) {
    const cityQuery = this.wardRepository
      .createQueryBuilder('ward')
      .where('ward.districtCode = :code', {
        code: wardQueryDto.districtCode,
      });

    if (wardQueryDto?.q) {
      cityQuery.andWhere(
        'unaccent(ward.name) ILIKE unaccent(:value) OR unaccent(ward.nameEn) ILIKE unaccent(:value)',
        { value: `%${wardQueryDto.q}%` },
      );
    }

    const provinces = await cityQuery.getMany();
    return this.mapper.mapArray(provinces, WardEntity, WardResponseDto);
  }

  async findOne(code: string) {
    const ward = await this.wardRepository.findOneBy({
      code,
    });

    if (!ward) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Ward not found',
      });
    }

    return this.mapper.map(ward, WardEntity, WardResponseDto);
  }
}
