import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiCreatedResponse({
    type: CategoryResponseDto,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiCreatedResponse({
    type: [CategoryResponseDto],
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiCreatedResponse({
    type: CategoryResponseDto,
  })
  @Get(':slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.categoryService.findOneBySlug(slug);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiCreatedResponse({
    type: CategoryResponseDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiCreatedResponse({
    type: CategoryResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
