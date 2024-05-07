import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetail } from '../userdetails.entity';
import { Repository } from 'typeorm';
import { User } from '../../types/userdetails.type';
import { UserTypeDetails } from '../usertype.entity';
import { UserStatusDetails } from '../userstatus.entity';

@Injectable()
// INSERT INTO USERDETAILS STATUS
export class UserdetailService {
  constructor(
    @InjectRepository(UserDetail)
    private userDetailRepository: Repository<UserDetail>,
    @InjectRepository(UserTypeDetails)
    private userTypeRepository: Repository<UserTypeDetails>,
    @InjectRepository(UserStatusDetails)
    private userStatusRepository: Repository<UserStatusDetails>,
  ) {}

  async insert(payload: User) {
    try {
      const { userTypeID, userStatusID } = payload;
      const findTypeID = this.userTypeRepository.find({
        where: {
          userTypeID: userTypeID,
        },
      });

      const findStatusID = this.userStatusRepository.find({
        where: {
          userStatusID: userStatusID,
        },
      });
      if (findStatusID && findTypeID) {
        const queryBuilder = this.userDetailRepository
          .createQueryBuilder()
          .insert()
          .into(UserDetail)
          .values({
            userID: payload.userID,
            userName: payload.userName,
            userSurname: payload.userSurname,
            userMobileNo: payload.userMobileNo,
            userEmail: payload.userEmail,
            userAddress: payload.userAddress,
            userDOB: payload.userDOB,
            userGender: payload.userGender,
            userTypeID: payload.userTypeID,
            userStatusID: payload.userStatusID,
          });
        return await queryBuilder.execute();
      }
      return null;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
