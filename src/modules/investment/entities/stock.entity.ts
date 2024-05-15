import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StockData {
  @PrimaryGeneratedColumn()
  stockID: number;
  @Column('json')
  stocks: object;
}
