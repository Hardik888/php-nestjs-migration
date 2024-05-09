import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserStatusDetails {
  @PrimaryGeneratedColumn()
  userStatusID: number;
  @Column()
  userStatusName: string;
}
