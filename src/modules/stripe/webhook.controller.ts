import { Controller, Header, Post, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(private stripeService: StripeService) {}

  @Post('create')
  async trigger(@Req() req: Request) {
    const stripeSignature = req.headers?.['stripe-signature'];
    console.log({ stripeSignature });

    await this.stripeService.handleWebhookEvent(
      req.body,
      String(stripeSignature),
    );
    return 'ok';
  }
}
