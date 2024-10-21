import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';
import { RoleDocument } from 'src/role/entities/role.schema';
import { RoleSchema } from './../../role/entities/role.schema';

export type UserDocumentType = HydratedDocument<UserDocument>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
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
    type: RoleSchema,
    ref: RoleDocument.name,
    required: true,
  })
  role: RoleDocument;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
