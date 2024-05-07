import { Injectable } from '@nestjs/common';
import { UserTypeService } from './entities/provider/usertype.service';
import { UserType } from './types/usertype.type';
import { response } from 'express';
import { UserStatus } from './types/userstatus.type';
import { UserStatusService } from './entities/provider/userstatus.service';
import { Userdetails } from './types/userdetails.type';

@Injectable()
export class UserService {
  constructor(
    private userTypeService: UserTypeService,
    private userStatusService: UserStatusService,
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

  async insertIntoUserDetails(payload: Userdetails){
    
  }
}
