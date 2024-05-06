import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserStatusDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  userStatusID: number;
  @Column()
  userStatusName: string;
}