import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { Req, Res } from '@nestjs/common';

@Controller('usertype')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async insertUserType(@Req() req: Request, @Res() res: Response) {
    try {
      const { userTypeName, userTypeID } = req.body;
      const payload = {
        userTypeName,
        userTypeID,
      };
      console.log(payload);
      if (!userTypeName || !userTypeID) {
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await this.userService.insertToUserType(payload);
      return res.send( response);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
