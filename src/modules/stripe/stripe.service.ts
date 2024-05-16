import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import Stripe from 'stripe';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { StripeType } from './types/stripepayload.stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel('PRODUCT') private readonly productModel: Model<Product>,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'));
  }
  async createPaymentSession(data: StripeType) {
    const { quantity } = data;
    try {
      const product = await this.productModel.findById(data.productID);
      if (!product) {
        throw new Error('Product not found');
      }
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: product.testStock.currency,
              product_data: {
                name: product.testStock.desciption,
                description: product.testStock.desciption,
              },
              unit_amount: product.testStock.amount * 100,
            },
            quantity,
          },
        ],
        mode: 'payment',
        success_url: '',
        cancel_url: '',
        client_reference_id: data.userID,
        metadata: {},
      });
      return session.id;
    } catch (error) {
      throw new Error('Error creating payment session:' + error.message);
    }
  }
}
