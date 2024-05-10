import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BankDetail {
  @PrimaryGeneratedColumn('increment')
  bankID: number;
  @Column()
  bankName: string;
  @Column()
  bankBranch: string;
  @Column()
  bankIFSC: string;
  @Column()
  bankAddress: string;
}
