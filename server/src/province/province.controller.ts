import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProvinceQueryDto } from './dto/province-query.dto';
import { ProvinceResponseDto } from './dto/province-response.dto';
import { ProvinceService } from './province.service';

@ApiTags('Province')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @ApiOkResponse({
    type: [ProvinceResponseDto],
  })
  @Get()
  findAll(@Query() query: ProvinceQueryDto) {
    return this.provinceService.findAll(query);
  }

  @ApiOkResponse({
    type: ProvinceResponseDto,
  })
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.provinceService.findOne(code);
  }
}
