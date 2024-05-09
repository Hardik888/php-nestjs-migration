import { UserDetail } from 'src/modules/admin/entities/userdetails.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LoginDetail {
  @PrimaryGeneratedColumn('uuid')
  loginID: number;
  @Column({ nullable: false, unique: true })
  userMobileNo: string;
  @ManyToOne(() => UserDetail)
  @JoinColumn({ name: 'userID' })
  userID: number;
}
