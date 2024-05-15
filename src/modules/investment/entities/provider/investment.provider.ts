import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestmentDetail } from '../investment.entity';
import { Repository } from 'typeorm';
import { Investment } from '../../types/investment.type';

@Injectable()
export class InvestmentDetailService {
  constructor(
    @InjectRepository(InvestmentDetail)
    private investmentRepository: Repository<InvestmentDetail>,
  ) {}

  async insert(payload: Investment) {
    try {
      const {
        userID,
        bankID,
        durationID,
        maturityID,
        loginID,
        investmentDetail,
        investmentTotal,
      } = payload;
      const queryBuilder = this.investmentRepository
        .createQueryBuilder()
        .insert()
        .into(InvestmentDetail)
        .values({
          userID: userID,
          bankID: bankID,
          durationID: durationID,
          maturityID: maturityID,
          loginID: loginID,
          investmentDetail: investmentDetail,
          investmentTotal: investmentTotal,
        });
      const result = await queryBuilder.execute();
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
