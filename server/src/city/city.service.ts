import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityQueryDto } from './dto/city-query.dto';
import { CityResponseDto } from './dto/city-response.dto';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async findAll(cityQueryDto: CityQueryDto) {
    const cityQuery = this.cityRepository.createQueryBuilder('city');

    if (cityQueryDto?.q) {
      cityQuery.andWhere(
        'unaccent(city.name) ILIKE unaccent(:value) OR unaccent(city.nameEn) ILIKE unaccent(:value)',
        { value: `%${cityQueryDto.q}%` },
      );
    }

    const cities = await cityQuery.getMany();
    return this.mapper.mapArray(cities, CityEntity, CityResponseDto);
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOneBy({
      id,
    });

    if (!city) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'City not found',
      });
    }

    return this.mapper.map(city, CityEntity, CityResponseDto);
  }
}
