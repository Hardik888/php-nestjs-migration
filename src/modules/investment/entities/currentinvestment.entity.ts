import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CurrentInvestment {
  @PrimaryGeneratedColumn('increment')
  maturityID: number;
  @Column()
  currentMaturityDate: string;
  @Column()
  currentMaturityAmount: string;
}
