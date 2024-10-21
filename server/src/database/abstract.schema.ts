import { Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

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
}
