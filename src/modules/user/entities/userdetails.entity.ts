import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserTypeDetails } from '../entities/usertype.entity';
import { UserStatusDetails } from './userstatus.entity';

@Entity()
export class UserDetail {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  userName: string;

  @Column()
  userSurname: string;

  @Column()
  userMobileNo: number;

  @Column()
  userEmail: string;

  @Column()
  userAddress: string;

  @Column()
  userDOB: Date;

  @Column()
  userGender: string;

  @ManyToOne(() => UserTypeDetails)
  userTypeID: number;

  @ManyToOne(() => UserStatusDetails)
  userStatusID: number;
}
