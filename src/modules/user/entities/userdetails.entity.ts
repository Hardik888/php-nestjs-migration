import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserTypeDetails } from '../entities/usertype.entity';
import { UserStatusDetails } from './userstatus.entity';

@Entity()
export class UserDetail {
  @PrimaryGeneratedColumn('uuid')
  userID: string;
  @Column()
  userName: string;

  @Column()
  userSurname: string;

  @Column()
  userMobileNo: string;

  @Column()
  userEmail: string;

  @Column()
  userAddress: string;

  @Column()
  userDOB: string;

  @Column()
  userGender: string;

  @ManyToOne(() => UserTypeDetails)
  @JoinColumn({ name: 'userTypeID' })
  userTypeID: number;

  @ManyToOne(() => UserStatusDetails)
  @JoinColumn({ name: 'userStatusID' })
  userStatusID: number;
}
