import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';
import { RoleDocument } from 'src/role/entities/role.schema';
import { RoleSchema } from './../../role/entities/role.schema';

export type UserDocumentType = HydratedDocument<UserDocument>;

@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserDocument extends AbstractDocument {
  @AutoMap()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @AutoMap()
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

  @AutoMap()
  @Prop({
    type: String,
  })
  image?: string | null;

  @AutoMap()
  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @AutoMap(() => RoleDocument)
  @Prop({
    type: RoleSchema,
    ref: RoleDocument.name,
    required: true,
  })
  role: RoleDocument;

  @AutoMap()
  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
