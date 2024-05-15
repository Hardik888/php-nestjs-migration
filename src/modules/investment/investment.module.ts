import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import {
  BankDetailService,
  InvestmentDetailService,
  InvestmentDurationService,
  CurrentInvestmentService,
} from './entities/provider/index';
import {
  InvestmentDetail,
  StockData,
  CurrentInvestment,
  BankDetail,
  InvestmentDuration,
} from './entities/index';
import { StripeModule } from '../stripe/stripe.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvestmentDuration,
      CurrentInvestment,
      BankDetail,
      InvestmentDetail,
      StockData,
    ]),
    StripeModule,
  ],
  controllers: [InvestmentController],
  providers: [
    InvestmentService,
    BankDetailService,
    InvestmentDetailService,
    InvestmentDurationService,
    CurrentInvestmentService,
  ],
})
export class InvestmentModule {}
