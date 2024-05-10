import { UserDetail } from 'src/modules/admin/entities/userdetails.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankDetail } from './bank.entity';
import { InvestmentDuration } from './duration.entity';
import { CurrentInvestment } from './currentinvestment.entity';
import { LoginDetail } from 'src/modules/auth/entities/auth.entity';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class InvestmentDetail {
  @PrimaryGeneratedColumn('uuid')
  InvestmentID: number;
  @ManyToOne(() => UserDetail)
  @JoinColumn({ name: 'userID' })
  userID: number;
  @ManyToOne(() => BankDetail)
  @JoinColumn({ name: 'bankID' })
  bankID: number;
  @ManyToOne(() => InvestmentDuration)
  @JoinColumn({ name: 'durationID' })
  durationID: number;
  @ManyToOne(() => CurrentInvestment)
  @JoinColumn({ name: 'maturityID' })
  maturityID: number;
  @ManyToOne(() => LoginDetail)
  @JoinColumn({ name: 'loginID' })
  loginID: number;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.INACTIVE,
  })
  investmentDetail: Status;
  @Column()
  investmentTotal: number;
}
