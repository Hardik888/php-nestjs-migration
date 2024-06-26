import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { Req, Res } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
// @UseInterceptors(new UserIDInterceptor<UserIDDto>(UserIDDto))
@Controller('user')
export class AdminController {
  constructor(private userService: AdminService) {}
  private errorbody() {
    throw new HttpException(
      {
        message: 'Invalid Fields',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  @Post('usertype')
  async insertUserType(@Req() req: Request, @Res() res: Response) {
    try {
      const { userTypeName, userTypeID } = req.body;
      const payload = {
        userTypeName,
        userTypeID,
      };
      // console.log(payload);
      if (!userTypeName && !userTypeID) {
        this.errorbody();
      }
      const response = await this.userService.insertToUserType(payload);
      if (!response) {
        throw new HttpException(
          {
            message: 'Usertype failed',
          },
          HttpStatus.CONFLICT,
        );
      }
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
      if (!userStatusName && !userStatusID) {
        this.errorbody();
      }
      const response = await this.userService.insertToUserStatus(payload);
      if (!response) {
        throw new HttpException(
          {
            message: 'UserStatus failed',
          },
          HttpStatus.CONFLICT,
        );
      }
      return res.send(response);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
  @Post('DeleteUser')
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    try {
      const { userID } = req.body;
      if (!userID) {
        this.errorbody();
      }
      const response = await this.userService.deleteUser(userID);

      if (!response) {
        throw new HttpException(
          {
            message: 'User deletion failed',
          },
          HttpStatus.CONFLICT,
        );
      }
      return res.send(response);
    } catch (error) {
      throw error;
    }
  }
  @Post('Userdetails')
  async insertUserDetails(@Req() req: Request) {
    try {
      const payload = req.body;
      if (!payload) {
        this.errorbody();
      }
      const response = await this.userService.inserttoUserDetails(payload);
      if (!response) {
        throw new HttpException(
          {
            message: 'User Insertion failed',
          },
          HttpStatus.CONFLICT,
        );
      }

      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
