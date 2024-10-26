import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.save(
      this.categoryRepository.create({
        ...createCategoryDto,
        slug: slugify(createCategoryDto.name).toLowerCase(),
      }),
    );
    return this.mapper.map(category, CategoryEntity, CategoryResponseDto);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return this.mapper.mapArray(
      categories,
      CategoryEntity,
      CategoryResponseDto,
    );
  }

  async findById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }

    return this.mapper.map(category, CategoryEntity, CategoryResponseDto);
  }

  async findOneBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({ where: { slug } });

    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }
    return this.mapper.map(category, CategoryEntity, CategoryResponseDto);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }
    const updatedCategory = await this.categoryRepository.save({
      ...category,
      ...updateCategoryDto,
      slug: slugify(updateCategoryDto.name).toLowerCase(),
    });
    return this.mapper.map(
      updatedCategory,
      CategoryEntity,
      CategoryResponseDto,
    );
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }

    const deletedCategory = await this.categoryRepository.remove(category);
    return this.mapper.map(
      deletedCategory,
      CategoryEntity,
      CategoryResponseDto,
    );
  }
}
