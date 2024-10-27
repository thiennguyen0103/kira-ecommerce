import { ConfigurableModuleBuilder } from '@nestjs/common';
import { StripeModuleOptionsType } from './stripe-options.type';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<StripeModuleOptionsType>()
    .setClassMethodName('forRoot')
    .build();
