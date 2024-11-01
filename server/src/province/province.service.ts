import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceQueryDto } from './dto/province-query.dto';
import { ProvinceResponseDto } from './dto/province-response.dto';
import { ProvinceEnity } from './entities/province.entity';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(ProvinceEnity)
    private readonly provinceRepository: Repository<ProvinceEnity>,
  ) {}

  async findAll(provinceQueryDto: ProvinceQueryDto) {
    const cityQuery = this.provinceRepository
      .createQueryBuilder('province')
      .where('province.cityId = :id', {
        id: provinceQueryDto.cityId,
      });

    if (provinceQueryDto?.q) {
      cityQuery.andWhere(
        'unaccent(province.name) ILIKE unaccent(:value) OR unaccent(province.nameEn) ILIKE unaccent(:value)',
        { value: `%${provinceQueryDto.q}%` },
      );
    }

    const provinces = await cityQuery.getMany();
    return this.mapper.mapArray(provinces, ProvinceEnity, ProvinceResponseDto);
  }

  async findOne(code: string) {
    const province = await this.provinceRepository.findOneBy({
      code,
    });

    if (!province) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Province not found',
      });
    }

    return this.mapper.map(province, ProvinceEnity, ProvinceResponseDto);
  }
}
