import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserTypeDetails } from './usertype.entity';
import { UserStatusDetails } from './userstatus.entity';

@Entity()
export class UserDetail {
  @PrimaryGeneratedColumn('uuid')
  userID: number;
  @Column({ nullable: false, unique: false })
  userName: string;

  @Column()
  userSurname: string;

  @Column({ nullable: false, unique: true })
  userMobileNo: string;

  @Column({ nullable: false, unique: true })
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
