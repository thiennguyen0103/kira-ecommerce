import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class CategoryDocument extends AbstractDocument {
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
  image?: string | null;

  @AutoMap()
  @Prop({
    type: String,
    required: true,
  })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);

CategorySchema.index({
  name: 'text',
});
