import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcategoryEntity } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRespository: Repository<SubcategoryEntity>,
  ) {}

  async findById(id: string) {
    const subcategory = await this.subcategoryRespository.findOneBy({
      id,
    });

    if (!subcategory) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Subcategory not found',
      });
    }

    return subcategory;
  }
}
