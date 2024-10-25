import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';
import { ProductDocument } from 'src/product/entities/product.entity';
import { UserDocument, UserSchema } from 'src/user/entities/user.schema';

@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class CardDocument extends AbstractDocument {
  @AutoMap()
  @Prop({
    type: ProductDocument,
    ref: ProductDocument.name,
    required: true,
  })
  product: ProductDocument;

  @AutoMap()
  @Prop({
    type: UserSchema,
    ref: UserDocument.name,
    required: true,
  })
  user: UserDocument;

  @AutoMap()
  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;
}

export const CardSchema = SchemaFactory.createForClass(CardDocument);
