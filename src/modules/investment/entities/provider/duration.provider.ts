import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestmentDuration } from '../duration.entity';
import { Repository } from 'typeorm';
import { Duration } from '../../types/duration.type';

@Injectable()
export class InvestmentDurationService {
  constructor(
    @InjectRepository(InvestmentDuration)
    private investmentDurationRepository: Repository<InvestmentDuration>,
  ) {}

  async insert(payload: Duration) {
    try {
      const { tenureDays, rateofInterest } = payload;
      const queryBuiler = this.investmentDurationRepository
        .createQueryBuilder()
        .insert()
        .into(InvestmentDuration)
        .values({
          tenureDays: tenureDays,
          rateofInterest: rateofInterest,
        });
      const result = await queryBuiler.execute();
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
