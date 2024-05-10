import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDetail } from '../auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginDetailsService {
  constructor(
    @InjectRepository(LoginDetail)
    private loginDetailsRepository: Repository<LoginDetail>,
  ) {}

  private userID: any;
  private userMobileNo: any;

  iD(userID: any) {
    this.userID = userID;
  }
  mobileNo(userMobileNo: any) {
    this.userMobileNo = userMobileNo;
  }

  async insert() {
    try {
      const queryBuilder = this.loginDetailsRepository
        .createQueryBuilder()
        .insert()
        .into(LoginDetail)
        .values({
          userMobileNo: this.userMobileNo,
          userID: this.userID,
        });
      return await queryBuilder.execute();
      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
