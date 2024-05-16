import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeType } from './types/stripepayload.stripe';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
  @Post('create')
  async create(@Body() body: StripeType) {
    const { userID, productID, quantity } = body;
    try {
      const response = await this.stripeService.createPaymentSession(body);
    } catch {}
  }
}
