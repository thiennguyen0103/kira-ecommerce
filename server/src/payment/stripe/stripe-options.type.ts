import Stripe from 'stripe';

export type StripeModuleOptionsType = {
  apiKey: string;
  options: Stripe.StripeConfig;
};
