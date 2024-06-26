import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserTypeService } from './entities/provider/usertype.service';
import { UserType } from './types/usertype.type';
import { UserStatus } from './types/userstatus.type';
import { UserStatusService } from './entities/provider/userstatus.service';
import { User } from './types/userdetails.type';
import { UserdetailService } from './entities/provider/userdetails.service';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AdminService {
  constructor(
    private userTypeService: UserTypeService,
    private userStatusService: UserStatusService,
    private userDetailService: UserdetailService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async insertToUserType(payload: UserType) {
    try {
      if (!payload) {
        return null;
      }
      const response = await this.userTypeService.insert(payload);

      return response;
    } catch (error) {
      return error;
    }
  }

  async insertToUserStatus(payload: UserStatus) {
    try {
      if (!payload) {
        return null;
      }

      const response = await this.userStatusService.insert(payload);

      return response;
    } catch (error) {
      return error;
    }
  }

  async inserttoUserDetails(payload: User) {
    try {
      if (!payload) {
        return null;
      }

      const response = await this.userDetailService.insert(payload);

      const a = await this.cacheService.set('userID', response.userID);
      const b = await this.cacheService.set(
        'userMobileNO',
        response.userMobileNo,
      );
      
      if (!response) {
        return null;
      }
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  async deleteUser(userID: string) {
    try {
      if (!userID) {
        return null;
      }
      const response = await this.userDetailService.deleteUser(userID);
      if (!response) {
        return false;
      }

      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
