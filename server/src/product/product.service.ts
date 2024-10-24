import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import slugify from 'slugify';
import { CategoryRepository } from 'src/category/category.repository';
import { UserRepository } from './../user/user.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async create(createProductDto: CreateProductDto, sellerId: string) {
    const seller = await this.userRepository.findOne({ _id: sellerId });

    if (!seller) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Seller not found',
      });
    }

    const category = await this.categoryRepository.findOne({
      _id: createProductDto.categoryId,
    });

    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }

    const product = await this.productRepository.create({
      ...createProductDto,
      slug: (
        createProductDto?.slug || slugify(createProductDto.name)
      ).toLowerCase(),
      seller,
      category,
    });

    return this.mapper.map(product, ProductDocument, ProductResponseDto);
  }

  async findAll() {
    const products = await this.productRepository.find({}, [
      { path: 'seller' },
      { path: 'category' },
    ]);
    return this.mapper.mapArray(products, ProductDocument, ProductResponseDto);
  }

  async findOneBySlug(slug: string) {
    const product = await this.productRepository.findOne({ slug }, [
      { path: 'seller' },
      { path: 'category' },
    ]);

    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }

    return this.mapper.map(product, ProductDocument, ProductResponseDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneAndUpdate(
      { _id: id },
      {
        ...updateProductDto,
        slug: slugify(updateProductDto.name).toLowerCase(),
      },
    );
    return this.mapper.map(product, ProductDocument, ProductResponseDto);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneAndDelete({
      _id: id,
    });
    return this.mapper.map(product, ProductDocument, ProductResponseDto);
  }
}
