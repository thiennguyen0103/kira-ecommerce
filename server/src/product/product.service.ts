import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { checkSortOrder } from 'src/utils/check-sort-order';
import { PageMetaDto } from 'src/utils/dtos/page-meta.dto';
import { PageDto } from 'src/utils/dtos/page.dto';
import { ProductSortByEnum } from 'src/utils/enums/query.enum';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly subcategoryService: SubcategoryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const subcategory = await this.subcategoryService.findById(
      createProductDto.subcategoryId,
    );

    const product = await this.productRepository.save(
      this.productRepository.create({
        ...createProductDto,
        slug: (
          createProductDto?.slug || slugify(createProductDto.name)
        ).toLowerCase(),
        subcategoryId: subcategory.id,
      }),
    );

    return this.mapper.map(product, ProductEntity, ProductResponseDto);
  }

  async findAll(productQueryDto: ProductQueryDto) {
    const productQuery = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.subcategory', 'subcategory');

    if (productQueryDto?.q) {
      productQuery.andWhere('unaccent(product.name) ILIKE unaccent(:value)', {
        value: `%${productQueryDto.q}%`,
      });
    }

    // filter with category slug
    if (productQueryDto.c) {
      productQuery.andWhere(
        'unaccent(product.subcategory.slug) ILIKE unaccent(:value)',
        {
          value: `%${productQueryDto.c}%`,
        },
      );
    }

    // get total items
    const itemCount = await productQuery.getCount();

    // split data with page and limit
    productQuery.skip(productQueryDto.skip).take(productQueryDto.limit);

    if (productQueryDto.sortBy) {
      switch (productQueryDto.sortBy) {
        case ProductSortByEnum.Popular:
          break;
        case ProductSortByEnum.CreatedAt:
          productQuery.addOrderBy('product.createdAt', 'DESC');
          break;
        case ProductSortByEnum.Sales:
          break;
        case ProductSortByEnum.Price:
          productQuery.addOrderBy(
            'product.price',
            checkSortOrder(productQueryDto.order),
          );
          break;
        default:
          productQuery.addOrderBy(`product.updatedAt`, 'DESC');
          break;
      }
    } else {
      productQuery.addOrderBy(`product.updatedAt`, 'DESC');
    }

    const items = await productQuery.getMany();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptions: {
        page: productQueryDto.page,
        skip: productQueryDto.skip,
        limit: productQueryDto.limit,
      },
    });

    const products = this.mapper.mapArray(
      items,
      ProductEntity,
      ProductResponseDto,
    );

    return new PageDto(products, pageMetaDto);
  }

  async findById(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }

    return this.mapper.map(product, ProductEntity, ProductResponseDto);
  }

  async findBySlug(slug: string) {
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
