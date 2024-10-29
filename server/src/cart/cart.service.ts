import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartResponseDto } from './dto/cart-response.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async addToCart(addToCartDto: AddToCartDto, userId: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: addToCartDto.productId,
      },
    });

    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User not found',
      });
    }

    const cartItem = await this.cartRepository.findOne({
      where: {
        product: {
          id: addToCartDto.productId,
        },
      },
    });

    let cart: CartEntity;
    if (cartItem) {
      cart = await this.cartRepository.save({
        ...cart,
        quantity: cartItem.quantity + addToCartDto.quantity,
      });
    } else {
      cart = await this.cartRepository.save(
        this.cartRepository.create({
          productId: product.id,
          userId: user.id,
          quantity: addToCartDto.quantity,
        }),
      );
    }

    return this.mapper.map(cart, CartEntity, CartResponseDto);
  }

  async findAll(userId: string) {
    const carts = await this.cartRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return this.mapper.mapArray(carts, CartEntity, CartResponseDto);
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.findOne({
      where: {
        id,
      },
    });
    if (!cart) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Cart not found',
      });
    }
    const udpatedCart = await this.cartRepository.save({
      ...cart,
      ...updateCartDto,
    });
    return this.mapper.map(udpatedCart, CartEntity, CartResponseDto);
  }

  async remove(id: string) {
    const cart = await this.cartRepository.findOne({
      where: {
        id,
      },
    });
    if (!cart) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Cart not found',
      });
    }
    const deletedCart = await this.cartRepository.remove(cart);
    return this.mapper.map(deletedCart, CartEntity, CartResponseDto);
  }
}
