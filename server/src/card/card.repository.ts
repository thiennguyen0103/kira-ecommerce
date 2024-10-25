import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { CardDocument } from './entities/card.entity';

@Injectable()
export class CardRepository extends AbstractRepository<CardDocument> {
  protected readonly logger = new Logger(CardRepository.name);

  constructor(@InjectModel(CardDocument.name) cardModel: Model<CardDocument>) {
    super(cardModel);
  }
}
