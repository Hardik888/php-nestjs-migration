import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserStatusDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  userStatus_ID: number;
  @Column()
  userStatus_Name: string;
}
