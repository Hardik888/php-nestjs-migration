import { InjectRepository } from '@nestjs/typeorm';
import { StockData } from '../stock.entity';
import { Repository } from 'typeorm';
import { Stock } from '../../types/stock.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockSync {
  constructor(
    @InjectRepository(StockData)
    private stockRepository: Repository<StockData>,
  ) {}

  async get(payload: Stock) {
    const findstock = this.stockRepository.find({
      where: { stockID: payload.stockID },
    });
    if (findstock) {
    }
  }
}
