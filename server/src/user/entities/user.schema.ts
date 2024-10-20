import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from 'mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';
import { RoleDocument } from 'src/role/entities/role.schema';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserDocument extends AbstractDocument {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
  })
  image?: string | null;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: RoleDocument.name,
  })
  role: RoleDocument;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
