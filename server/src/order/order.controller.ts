import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderService } from './order.service';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiCreatedResponse({
    type: OrderResponseDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.Client)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.orderService.create(createOrderDto, req.user.id);
  }

  @ApiCreatedResponse({
    type: [OrderResponseDto],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.orderService.findAll(req.user.id);
  }

  @ApiCreatedResponse({
    type: OrderResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(id);
  // }
}
