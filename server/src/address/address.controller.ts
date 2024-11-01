import
  {
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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { AddressService } from './address.service';
import { AddressResponseDto } from './dto/address-response.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(RoleEnum.Client)
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiCreatedResponse({
    type: AddressResponseDto,
  })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Req() req) {
    return this.addressService.create(createAddressDto, req.user?.id);
  }

  @ApiOkResponse({
    type: [AddressResponseDto],
  })
  @Get()
  findAll(@Req() req) {
    return this.addressService.findAll(req.user?.id);
  }

  @ApiCreatedResponse({
    type: AddressResponseDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() req,
  ) {
    return this.addressService.update(id, req.user?.id, updateAddressDto);
  }

  @ApiCreatedResponse({
    type: AddressResponseDto,
  })
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.addressService.remove(id, req.user?.id,);
  }
}
