import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { CardRepository } from './card.repository';
import { AddToCardDto } from './dto/add-to-card.dto';
import { CardResponseDto } from './dto/card-response.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardDocument } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly cardRepository: CardRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async addToCard(addToCardDto: AddToCardDto, userId: string) {
    const product = await this.productRepository.findOne({
      _id: addToCardDto.productId,
    });
    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Product not found',
      });
    }

    const user = await this.userRepository.findOne({ _id: userId });
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User not found',
      });
    }

    const cardItem = await this.cardRepository.findOne({
      product: {
        _id: addToCardDto.productId,
      },
    });

    let card: CardDocument;
    if (cardItem) {
      card = await this.cardRepository.findOneAndUpdate(
        { _id: cardItem._id },
        {
          product,
          user,
          quantity: cardItem.quantity + addToCardDto.quantity,
        },
      );
    } else {
      card = await this.cardRepository.create({
        product,
        user,
        quantity: addToCardDto.quantity,
      });
    }

    return this.mapper.map(card, CardDocument, CardResponseDto);
  }

  async findAll(userId: string) {
    const cards = await this.cardRepository.find({
      user: {
        _id: userId,
      },
    });
    return this.mapper.mapArray(cards, CardDocument, CardResponseDto);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepository.findOneAndUpdate(
      { _id: id },
      updateCardDto,
    );
    return this.mapper.map(card, CardDocument, CardResponseDto);
  }

  async remove(id: string) {
    const card = await this.cardRepository.findOneAndDelete({ _id: id });
    return this.mapper.map(card, CardDocument, CardResponseDto);
  }
}
