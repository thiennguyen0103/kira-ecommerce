import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CartModule } from 'src/cart/cart.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('stripe.stripeApiKey', {
          infer: true,
        }),
        options: {
          apiVersion: '2024-09-30.acacia',
        },
      }),
    }),
    CartModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
