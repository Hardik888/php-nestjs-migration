import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTypeDetails {
  @PrimaryGeneratedColumn({ name: 'userTypeID' })
  userTypeID: number;

  @Column({ name: 'userTypeName' })
  userTypeName: string;
}
