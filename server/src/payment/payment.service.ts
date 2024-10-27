import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CardService } from 'src/card/card.service';
import Stripe from 'stripe';
import { CheckoutDto } from './dto/checkout.dto';
import { StripeService } from './stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly cardService: CardService,
  ) {}

  test() {
    return this.stripeService.stripe.products.list();
  }

  async checkout(checkoutDto: CheckoutDto, userId: string) {
    const cards = await this.validateSelectedProducts(
      userId,
      checkoutDto.cardIds,
    );
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cards.map(
      (card) => ({
        price_data: {
          currency: 'vnd',
          product_data: {
            name: card.product.name,
            description: card.product.description,
            images: [card.product.image],
          },
          unit_amount: card.product.price,
        },
        quantity: card.quantity,
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

  private async validateSelectedProducts(userId: string, cardIds: string[]) {
    const userCardProducts = await this.cardService.findAll(userId);

    return cardIds.map((cardId) => {
      const cardProduct = userCardProducts.find((c) => c.id === cardId);
      if (!cardProduct) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          message: 'Product does not belong to user',
        });
      }
      return cardProduct;
    });
  }
}
