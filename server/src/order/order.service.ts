import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemService } from 'src/order-item/order-item.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly orderItemService: OrderItemService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const { items } = createOrderDto;
    let totalAmount = 0;

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const orderItem = await this.orderItemService.create(item);
        totalAmount += orderItem.price;
        return orderItem;
      }),
    );

    const order = await this.orderRepository.save(
      this.orderRepository.create({
        userId,
        totalAmount,
        items: orderItems,
      }),
    );

    return this.mapper.map(order, OrderEntity, OrderResponseDto);
  }

  async findAll(userId: string) {
    const orders = await this.orderRepository.findBy({
      user: {
        id: userId,
      },
    });

    return this.mapper.mapArray(orders, OrderEntity, OrderResponseDto);
  }

  async findById(id: string) {
    const order = await this.orderRepository.findOneBy({
      id,
    });

    if (!order) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Order not found',
      });
    }
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
