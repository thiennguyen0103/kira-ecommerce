import { AutoMap } from '@automapper/classes';
import { Prop, Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { now } from 'mongoose';

@Schema()
export class AbstractDocument {
  @Transform(
    (value) => {
      if ('value' in value) {
        return value.obj[value.key].toString();
      }

      return 'unknown value';
    },
    {
      toPlainOnly: true,
    },
  )
  public _id: string;

  @AutoMap()
  @Prop({ default: now })
  createdAt: Date;

  @AutoMap()
  @Prop({ default: now })
  updatedAt: Date;
}
