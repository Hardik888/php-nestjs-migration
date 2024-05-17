import { DynamicModule, Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from './entities/payment.schema';
import { ProductSchema } from './entities/product.schema';
import { WebhookController } from './webhook.controller';
@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController, WebhookController],
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: 'PAYMENT',
            schema: PaymentSchema,
          },
          {
            name: 'PRODUCT',
            schema: ProductSchema,
          },
        ]),
      ],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_API_KEY'),
          inject: [ConfigService],
        },
      ],
    };
  }
}
