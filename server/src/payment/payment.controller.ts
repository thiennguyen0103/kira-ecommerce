import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CheckoutDto } from './dto/checkout.dto';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/customer')
  getCustomer() {
    return this.paymentService.test();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.Client, RoleEnum.Seller)
  @Post('/checkout')
  createCheckoutSession(@Body() checkoutDto: CheckoutDto, @Req() req) {
    return this.paymentService.checkout(checkoutDto, req.user?.id);
  }
}
