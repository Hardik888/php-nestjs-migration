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
  CurrentInvestment,
  BankDetail,
  InvestmentDuration,
} from './entities/index';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvestmentDuration,
      CurrentInvestment,
      BankDetail,
      InvestmentDetail,
    ]),
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
