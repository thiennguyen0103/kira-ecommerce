import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DistrictService } from './district.service';
import { DistrictResponseDto } from './dto/distric-response.dto';
import { DistrictQueryDto } from './dto/district-query.dto';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOkResponse({
    type: [DistrictResponseDto],
  })
  @Get()
  findAll(@Query() query: DistrictQueryDto) {
    return this.districtService.findAll(query);
  }

  @ApiOkResponse({
    type: DistrictResponseDto,
  })
  @Get(':districtCode')
  findOne(@Param('districtCode') districtCode: string) {
    return this.districtService.findOne(districtCode);
  }
}
