import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictResponseDto } from './dto/distric-response.dto';
import { DistrictQueryDto } from './dto/district-query.dto';
import { DistrictEntity } from './entities/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,
  ) {}

  async findAll(districtQuery: DistrictQueryDto) {
    const cityQuery = this.districtRepository
      .createQueryBuilder('district')
      .where('district.provinceCode = :code', {
        code: districtQuery.provinceCode,
      });

    if (districtQuery?.q) {
      cityQuery.andWhere(
        'unaccent(district.name) ILIKE unaccent(:value) OR unaccent(district.nameEn) ILIKE unaccent(:value)',
        { value: `%${districtQuery.q}%` },
      );
    }

    const provinces = await cityQuery.getMany();
    return this.mapper.mapArray(provinces, DistrictEntity, DistrictResponseDto);
  }

  async findOne(code: string) {
    const district = await this.districtRepository.findOneBy({
      code,
    });

    if (!district) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'District not found',
      });
    }

    return this.mapper.map(district, DistrictEntity, DistrictResponseDto);
  }
}
