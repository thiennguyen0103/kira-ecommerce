import { FilterQuery, Model, PopulateOptions, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: TDocument | any): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    populateOptions?: PopulateOptions | PopulateOptions[],
    useLean = false,
  ): Promise<TDocument> {
    let query = this.model.findOne(filterQuery);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    if (useLean) {
      return query.lean<TDocument>().exec();
    }

    return query.exec();
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    return document;
  }

  async find(
    filterQuery?: FilterQuery<TDocument>,
    populateOptions?: PopulateOptions | PopulateOptions[],
    useLean = false,
  ): Promise<TDocument[]> {
    let query = this.model.find(filterQuery);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    if (useLean) {
      return query.lean<TDocument[]>().exec();
    }

    return query.exec();
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
