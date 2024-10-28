import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductResponseDto } from 'src/product/dto/product-response.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductService } from './../product/product.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemEntity } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    private readonly productService: ProductService,
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto) {
    const product = await this.productService.findById(
      createOrderItemDto.productId,
    );

    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }

    const orderItem = await this.orderItemRepository.save(
      this.orderItemRepository.create({
        product: this.mapper.map(product, ProductResponseDto, ProductEntity),
        quantity: createOrderItemDto.quantity,
        price: product.price * createOrderItemDto.quantity,
      }),
    );

    return orderItem;
  }
}
