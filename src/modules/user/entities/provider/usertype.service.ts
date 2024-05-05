import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTypeDetails } from '../usertype.entity';
import { UserType } from '../../types/usertype.type';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
// Insert Into the UserType Table
export class UserTypeService {
  constructor(
    // @Inject('USERTYPE_REPOSITORY')
    @InjectRepository(UserTypeDetails)
    private userTypeRepo: Repository<UserTypeDetails>,
  ) {}

  insert(payload: UserType) {
    try {
      //Using QueryBuilder for sql queries
      return this.userTypeRepo
        .createQueryBuilder()
        .insert()
        .into(UserTypeDetails)
        .values({
          userTypeID: payload.userTypeID,
          userTypeName: payload.userTypeName,
        });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('DB Shit went south!!!');
    }
  }
}
