import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import {
  BankDetailService,
  InvestmentDetailService,
  InvestmentDurationService,
  CurrentInvestmentService,
  StockSync,
} from './entities/provider/index';
import {
  InvestmentDetail,
  StockData,
  CurrentInvestment,
  BankDetail,
  InvestmentDuration,
} from './entities/index';
import { StripeModule } from '../stripe/stripe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../stripe/entities/product.schema';
@Module({
  imports: [
    StripeModule,
    TypeOrmModule.forFeature([
      InvestmentDuration,
      CurrentInvestment,
      BankDetail,
      InvestmentDetail,
      StockData,
    ]),
    MongooseModule.forFeature([{ name: 'PRODUCT', schema: ProductSchema }]),
  ],
  controllers: [InvestmentController],
  providers: [
    InvestmentService,
    BankDetailService,
    StockSync,
    InvestmentDetailService,
    InvestmentDurationService,
    CurrentInvestmentService,
  ],
})
export class InvestmentModule {}
