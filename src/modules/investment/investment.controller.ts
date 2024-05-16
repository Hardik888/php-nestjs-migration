import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { Stock } from './types/stock.type';
@Controller('investment')
export class InvestmentController {
  constructor(private investmentService: InvestmentService) {}
  @Get('stocks')
  async fetchdata(@Body() stock: Stock) {
    try {
      const populate = await this.investmentService.checkandPopulate(stock);
      if (!populate) {
        throw new HttpException('Cant Fetch', HttpStatus.BAD_REQUEST);
      }

      return populate;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
