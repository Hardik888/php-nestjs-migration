import { Injectable } from '@nestjs/common';
import { UserTypeService } from './entities/provider/usertype.service';
import { UserType } from './types/usertype.type';
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(private userTypeService: UserTypeService) {}

  async insertToUserType(payload: UserType) {
    try {
      if (!payload) {
        return null;
      }
      const response = await this.userTypeService.insert(payload);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }
}
