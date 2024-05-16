import { Injectable } from '@nestjs/common';
import {
  BankDetailService,
  InvestmentDetailService,
  InvestmentDurationService,
  CurrentInvestmentService,
  StockSync,
} from './entities/provider/index';
import { Stock } from './types/stock.type';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../stripe/entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class InvestmentService {
  constructor(
    private stockSyncSerice: StockSync,
    @InjectModel('PRODUCT')
    private productModel: Model<Product>,
  ) {}

  async checkandPopulate(payload: Stock) {
    const findstock = await this.stockSyncSerice.get(payload);
    const productdata = new this.productModel();
    productdata.testStock.amount = findstock[0].stocks.testStock;
    productdata.testStock2.amount = findstock[0].stocks.testStock2;
    productdata.testStock3.amount = findstock[0].stocks.testStock3;
    const result = await productdata.save();
    return result;
  }
}
