import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankDetail } from '../bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankDetailService {
  constructor(
    @InjectRepository(BankDetail)
    private bankRepository: Repository<BankDetail>,
  ) {}
}
