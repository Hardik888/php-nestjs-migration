import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserTypeDetails {
    @PrimaryGeneratedColumn()
    UserType_ID: number;
    @Column()
    UserType_Name: string;
}