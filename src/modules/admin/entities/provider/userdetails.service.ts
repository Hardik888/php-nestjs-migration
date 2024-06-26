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
      const { userTypeID, userStatusID, userMobileNo } = payload;
      const findTypeID = await this.userTypeRepository.find({
        where: {
          userTypeID: userTypeID,
        },
      });

      const findStatusID = await this.userStatusRepository.find({
        where: {
          userStatusID: userStatusID,
        },
      });

      if (findTypeID === undefined || userStatusID === undefined) {
        throw new HttpException(
          'userTypeID and userStatusID are required',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (findStatusID && findTypeID) {
        const queryBuilder = this.userDetailRepository
          .createQueryBuilder()
          .insert()
          .into(UserDetail)
          .values({
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

        const result = await queryBuilder.execute();
        const userID = result.identifiers[0].userID;
        return {
          userID: userID,
          userMobileNo: userMobileNo,
        };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteUser(userID: any): Promise<boolean | any> {
    try {
      if (!userID) {
        return false;
      }

      const queryBuilder = this.userDetailRepository
        .createQueryBuilder()
        .delete()
        .from(UserDetail, 'user_detail')
        .where('user_detail.userID = :userID', { userID: userID });

      const result = await queryBuilder.execute();
      if (result.affected == 0) {
        return false;
      }
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
