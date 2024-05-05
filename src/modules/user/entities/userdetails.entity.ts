import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserTypeDetails } from './userType.entity';
import { UserStatusDetails } from './userstatus.entity';

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn()
  userID: number;

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
  userDOB: Date;

  @Column()
  userGender: string;

  @ManyToOne(() => UserTypeDetails)
  userTypeID: UserTypeDetails;

  @ManyToOne(() => UserStatusDetails)
  userStatusID: UserStatusDetails;
}
