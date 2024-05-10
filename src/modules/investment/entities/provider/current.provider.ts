import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentInvestment } from '../currentinvestment.entity';
import { Repository } from 'typeorm';
import { Current } from '../../types/current.type';

@Injectable()
export class CurrentInvestmentService {
  constructor(
    @InjectRepository(CurrentInvestment)
    private currentInvestmentRepository: Repository<CurrentInvestment>,
  ) {}

  async insert(payload: Current) {
    try {
      const { currentMaturityAmount, currentMaturityDate } = payload;

      const queryBuiler = this.currentInvestmentRepository
        .createQueryBuilder()
        .insert()
        .into(CurrentInvestment)
        .values({
          currentMaturityAmount: currentMaturityAmount,
          currentMaturityDate: currentMaturityDate,
        });

      const result = await queryBuiler.execute();
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
