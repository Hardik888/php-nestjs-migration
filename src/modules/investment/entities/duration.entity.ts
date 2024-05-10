import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvestmentDuration {
  @PrimaryGeneratedColumn('increment')
  durationID: number;
  @Column()
  tenureDays: number;
  @Column()
  rateofInterest: number;
}
