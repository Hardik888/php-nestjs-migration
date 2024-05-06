import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { Req, Res } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('usertype')
  async insertUserType(@Req() req: Request, @Res() res: Response) {
    try {
      const { userTypeName, userTypeID } = req.body;
      const payload = {
        userTypeName,
        userTypeID,
      };
      console.log(payload);
      if (!userTypeName && !userTypeID) {
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await this.userService.insertToUserType(payload);
      return res.send(response);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
  @Post('userstatus')
  async insertUserStatus(@Req() req: Request, @Res() res: Response) {
    try {
      const { userStatusName, userStatusID } = req.body;
      const payload = { userStatusName, userStatusID };
      if (!userStatusID && !userStatusName) {
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await this.userService.insertToUserStatus(payload);

      return res.send(response);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
