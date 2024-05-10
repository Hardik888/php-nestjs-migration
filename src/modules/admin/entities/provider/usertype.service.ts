import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTypeDetails } from '../usertype.entity';
import { UserType } from '../../types/usertype.type';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
// Insert Into the UserType Table
export class UserTypeService {
  constructor(
    @InjectRepository(UserTypeDetails)
    private userTypeRepo: Repository<UserTypeDetails>,
  ) {}

  async insert(payload: UserType) {
    try {
      //Using QueryBuilder for sql queries
      const queryBuiler = this.userTypeRepo
        .createQueryBuilder()
        .insert()
        .into(UserTypeDetails)
        .values({
          userTypeID: payload.userTypeID,
          userTypeName: payload.userTypeName,
        });
      const result = await queryBuiler.execute();
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Cannot Insert');
    }
  }
}
