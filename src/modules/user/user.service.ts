import { Injectable } from '@nestjs/common';
import { UserTypeService } from './entities/provider/usertype.service';
import { UserType } from './types/usertype.type';

@Injectable()
export class UserService {
  constructor(private userTypeService: UserTypeService) {}

  insertToUserType(payload: UserType) {
    try {
      if (!payload) {
        return null;
      }
      return this.userTypeService.insert(payload);
    } catch (error) {
      return error;
    }
  }
}
