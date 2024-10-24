import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.Seller)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req) {
    return this.productService.create(createProductDto, req.user?.id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productService.findOneBySlug(slug);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Seller)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Seller, RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
