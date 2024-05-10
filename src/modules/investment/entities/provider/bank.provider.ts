import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankDetail } from '../bank.entity';
import { Repository } from 'typeorm';
import { Bank } from '../../types/bank.type';

@Injectable()
export class BankDetailService {
  constructor(
    @InjectRepository(BankDetail)
    private bankRepository: Repository<BankDetail>,
  ) {}

  async Insert(payload: Bank) {
    try {
      const { bankName, bankBranch, bankIFSC } = payload;

      const queryBuiler = this.bankRepository
        .createQueryBuilder()
        .insert()
        .into(BankDetail)
        .values({
          bankName: bankName,
          bankBranch: bankBranch,
          bankIFSC: bankIFSC,
        });
      const result = await queryBuiler.execute(); //execute the transaction
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
