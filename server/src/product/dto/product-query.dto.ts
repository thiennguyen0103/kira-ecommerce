import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/utils/dtos/page-options.dto';
import { OrderEnum } from 'src/utils/enums/order.enum';
import { ProductSortByEnum } from 'src/utils/enums/query.enum';

export class ProductQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  c?: string;

  @ApiPropertyOptional({
    type: String,
    enum: [
      ProductSortByEnum.Popular,
      ProductSortByEnum.CreatedAt,
      ProductSortByEnum.Sales,
      ProductSortByEnum.Price,
    ],
  })
  @IsString()
  @IsOptional()
  sortBy: String;

  @ApiPropertyOptional({
    type: String,
    enum: [OrderEnum.ASC, OrderEnum.DESC],
  })
  @IsString()
  @IsOptional()
  order: string;
}
