import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductRepository extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(ProductDocument.name) productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
