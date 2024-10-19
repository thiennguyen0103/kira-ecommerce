import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';
import { RoleEnum } from 'src/utils/enums/roles.enum';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class RoleDocument extends AbstractDocument {
  @Prop({
    type: String,
    required: true,
  })
  name: RoleEnum;
}

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);
