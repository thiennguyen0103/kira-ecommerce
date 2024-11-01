import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CityQueryDto } from './dto/city-query.dto';
import { CityResponseDto } from './dto/city-response.dto';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOkResponse({
    type: [CityResponseDto],
  })
  @Get()
  findAll(@Query() query: CityQueryDto) {
    return this.cityService.findAll(query);
  }

  @ApiOkResponse({
    type: CityResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cityService.findOne(id);
  }
}
