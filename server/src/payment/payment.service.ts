import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import Stripe from 'stripe';
import { CheckoutDto } from './dto/checkout.dto';
import { StripeService } from './stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly cartService: CartService,
  ) {}

  test() {
    return this.stripeService.stripe.products.list();
  }

  async checkout(checkoutDto: CheckoutDto, userId: string) {
    const carts = await this.validateSelectedProducts(
      userId,
      checkoutDto.cartIds,
    );
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = carts.map(
      (cart) => ({
        price_data: {
          currency: 'vnd',
          product_data: {
            name: cart.product.name,
            description: cart.product.description,
            images: [cart.product.image],
          },
          unit_amount: cart.product.price,
        },
        quantity: cart.quantity,
      }),
    );

    return this.stripeService.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://example.com/success',
      cancel_url: 'http://example.com/cancel',
    });
  }

  private async validateSelectedProducts(userId: string, cartIds: string[]) {
    const userCartProducts = await this.cartService.findAll(userId);

    return cartIds.map((cartId) => {
      const cartProduct = userCartProducts.find((c) => c.id === cartId);
      if (!cartProduct) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          message: 'Product does not belong to user',
        });
      }
      return cartProduct;
    });
  }
}
