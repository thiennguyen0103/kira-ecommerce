import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import slugify from 'slugify';
import { CategoryRepository } from './category.repository';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create({
      ...createCategoryDto,
      slug: slugify(createCategoryDto.name).toLowerCase(),
    });
    return this.mapper.map(category, CategoryDocument, CategoryResponseDto);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return this.mapper.mapArray(
      categories,
      CategoryDocument,
      CategoryResponseDto,
    );
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({ _id: id });

    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }

    return this.mapper.map(category, CategoryDocument, CategoryResponseDto);
  }

  async findOneBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({ slug });

    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }

    return this.mapper.map(category, CategoryDocument, CategoryResponseDto);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneAndUpdate(
      { _id: id },
      {
        ...updateCategoryDto,
        slug: slugify(updateCategoryDto.name).toLowerCase(),
      },
    );
    return this.mapper.map(category, CategoryDocument, CategoryResponseDto);
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOneAndDelete({
      _id: id,
    });
    return this.mapper.map(category, CategoryDocument, CategoryResponseDto);
  }
}
