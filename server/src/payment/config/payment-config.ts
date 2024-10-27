import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { StripeConfigType } from './payment-config.type';
import { registerAs } from '@nestjs/config';

class EnvironmenVariablesValidator {
  @IsString()
  STRIPE_API_KEY: string;
}

export default registerAs<StripeConfigType>('stripe', () => {
  validateConfig(process.env, EnvironmenVariablesValidator);

  return {
    stripeApiKey: process.env.STRIPE_API_KEY,
  };
});
