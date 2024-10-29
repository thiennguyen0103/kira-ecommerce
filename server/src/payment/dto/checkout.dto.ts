import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CheckoutDto {
  @ApiProperty({
    type: [String],
  })
  @IsUUID(undefined, { each: true })
  cartIds: string[];
}
