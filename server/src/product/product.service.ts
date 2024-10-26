import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async create(createProductDto: CreateProductDto, sellerId: string) {
    const seller = await this.userRepository.findOne({
      where: { id: sellerId },
    });

    if (!seller) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Seller not found',
      });
    }

    const category = await this.categoryRepository.findOne({
      where: {
        id: createProductDto.categoryId,
      },
    });

    if (!category) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Category not found',
      });
    }

    const product = await this.productRepository.save(
      this.productRepository.create({
        ...createProductDto,
        slug: (
          createProductDto?.slug || slugify(createProductDto.name)
        ).toLowerCase(),
        seller,
        category,
      }),
    );

    return this.mapper.map(product, ProductEntity, ProductResponseDto);
  }

  async findAll() {
    const products = await this.productRepository.find();
    return this.mapper.mapArray(products, ProductEntity, ProductResponseDto);
  }

  async findOneBySlug(slug: string) {
    const product = await this.productRepository.findOne({ where: { slug } });

    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }

    return this.mapper.map(product, ProductEntity, ProductResponseDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }

    const updatedProduct = await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
    return this.mapper.map(updatedProduct, ProductEntity, ProductResponseDto);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }
    const deletedProduct = await this.productRepository.remove(product);
    return this.mapper.map(deletedProduct, ProductEntity, ProductResponseDto);
  }
}
