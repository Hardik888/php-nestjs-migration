import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserStatusDetails } from '../userstatus.entity';
import { UserStatus } from '../../types/userstatus.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
// INSERT INTO USERSTATUS TABLE
export class UserStatusService {
  constructor(
    @InjectRepository(UserStatusDetails)
    private userStatusRepo: Repository<UserStatusDetails>,
  ) {}

  async insert(payload: UserStatus) {
    try {
      //Using QueryBuilder for sql queries
      const queryBuiler = this.userStatusRepo
        .createQueryBuilder()
        .insert()
        .into(UserStatusDetails)
        .values({
          userStatusID: payload.userStatusID,
          userStatusName: payload.userStatusName,
        });
      const result = await queryBuiler.execute();

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Cannot Insert');
    }
  }
}
