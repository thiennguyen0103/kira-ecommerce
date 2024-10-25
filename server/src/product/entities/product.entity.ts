import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CategoryDocument } from 'src/category/entities/category.entity';
import { AbstractDocument } from 'src/database/abstract.schema';
import { UserDocument } from 'src/user/entities/user.schema';

@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class ProductDocument extends AbstractDocument {
  @AutoMap()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @AutoMap()
  @Prop({
    type: String,
  })
  description?: string;

  @AutoMap()
  @Prop({
    type: String,
  })
  image?: string | null;

  @AutoMap()
  @Prop({
    type: String,
    required: true,
  })
  slug: string;

  @AutoMap()
  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @AutoMap()
  @Prop({
    type: Number,
    default: 0,
    required: true,
  })
  rating: number;

  @AutoMap()
  @Prop({
    type: Types.ObjectId,
    ref: CategoryDocument.name,
    required: true,
  })
  category: CategoryDocument;

  @AutoMap()
  @Prop({
    type: Types.ObjectId,
    ref: UserDocument.name,
    required: true,
  })
  seller: UserDocument;

  @AutoMap()
  @Prop({
    type: Boolean,
    default: false,
  })
  isDelete: boolean;

  @AutoMap()
  @Prop({
    type: Date,
  })
  deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);

ProductSchema.index({
  name: 'text',
  description: 'text',
});
