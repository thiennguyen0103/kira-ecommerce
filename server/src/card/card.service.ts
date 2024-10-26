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
import { AddToCardDto } from './dto/add-to-card.dto';
import { CardResponseDto } from './dto/card-response.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async addToCard(addToCardDto: AddToCardDto, userId: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: addToCardDto.productId,
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

    const cardItem = await this.cardRepository.findOne({
      where: {
        product: {
          id: addToCardDto.productId,
        },
      },
    });

    let card: CardEntity;
    if (cardItem) {
      card = await this.cardRepository.save({
        ...card,
        quantity: cardItem.quantity + addToCardDto.quantity,
      });
    } else {
      card = this.cardRepository.create({
        productId: product.id,
        userId: user.id,
        quantity: addToCardDto.quantity,
      });
    }

    return this.mapper.map(card, CardEntity, CardResponseDto);
  }

  async findAll(userId: string) {
    const cards = await this.cardRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return this.mapper.mapArray(cards, CardEntity, CardResponseDto);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepository.findOne({
      where: {
        id,
      },
    });
    if (!card) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Card not found',
      });
    }
    const udpatedCard = await this.cardRepository.save({
      ...card,
      ...updateCardDto,
    });
    return this.mapper.map(udpatedCard, CardEntity, CardResponseDto);
  }

  async remove(id: string) {
    const card = await this.cardRepository.findOne({
      where: {
        id,
      },
    });
    if (!card) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Card not found',
      });
    }
    const deletedCard = await this.cardRepository.remove(card);
    return this.mapper.map(deletedCard, CardEntity, CardResponseDto);
  }
}
