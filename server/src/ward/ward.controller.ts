import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WardQueryDto } from './dto/ward-query.dto';
import { WardResponseDto } from './dto/ward-response.dto';
import { WardService } from './ward.service';

@ApiTags('Ward')
@Controller('ward')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @ApiOkResponse({
    type: [WardResponseDto],
  })
  @Get()
  findAll(@Query() query: WardQueryDto) {
    return this.wardService.findAll(query);
  }

  @ApiOkResponse({
    type: WardResponseDto,
  })
  @Get(':wardCode')
  findOne(@Param('wardCode') wardCode: string) {
    return this.wardService.findOne(wardCode);
  }
}
