import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ProductResponseDto } from 'src/product/dto/product-response.dto';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({
    type: ProductResponseDto,
  })
  @SerializeOptions({
    groups: [],
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOkResponse({
    type: [ProductResponseDto],
  })
  @Get()
  findAll(@Query() productQuery: ProductQueryDto) {
    return this.productService.findAll(productQuery);
  }

  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @ApiOkResponse({
    type: [ProductResponseDto],
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOkResponse({
    type: [ProductResponseDto],
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
