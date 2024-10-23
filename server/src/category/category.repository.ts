import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryRepository extends AbstractRepository<CategoryDocument> {
  protected readonly logger = new Logger(CategoryRepository.name);

  constructor(
    @InjectModel(CategoryDocument.name) categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}
