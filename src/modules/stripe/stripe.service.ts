import { Injectable } from '@nestjs/common';
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
    const { quantity, userID, productID } = data;
    console.log(quantity);
    try {
      const product = await this.productModel
        .findById(data.productID)
        .lean()
        .exec();
      const name = product.testStock.description;
      console.log({ name });
      if (!product) {
        throw new Error('Product not found');
      }
      console.log(product);

      const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: name,
                description: 'test',
              },
              unit_amount: product.testStock.amount * 100,
            },
            quantity: quantity,
          },
        ],
        success_url: 'https://google.com',
        cancel_url: 'https://facebook.com',
        client_reference_id: data.userID.toString(),
        metadata: {
          userId: userID.toString(),
          productId: productID.toString(),
          quantity: quantity,
        },
      });
      console.log({ session });
      return session.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async handleWebhookEvent(payload: any, signature: string) {
    try {
      console.log({ payload, signature });

      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.configService.get('STRIPE_WEBHOOK_SECRET'),
      );
      console.log({ event });

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentIntentSucceeded(event.data.object);
          break;
        case 'checkout.session.completed':
          break;
        default:
          console.log('Unhandled event type:', event.type);
      }

      return { received: true };
    } catch (error) {
      console.error('Error handling webhook event:', error);
      return { error: error.message };
    }
  }

  private async handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent,
  ) {
    try {
      const userID = paymentIntent.metadata.userID;
      const productId = paymentIntent.metadata.productId;
      const quantity = paymentIntent.metadata.quantity;
      console.log({ paymentIntent });

      const payment = new this.productModel({
        userID,
        productId,
        quantity,
      });

      await payment.save();
    } catch (error) {
      console.error('Error handling successful payment:', error);
      throw new Error('Error handling successful payment');
    }
  }
}
