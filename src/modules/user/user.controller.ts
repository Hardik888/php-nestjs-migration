import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { Req, Res } from '@nestjs/common';
import { send } from 'process';

// interface ExtendedRequest extends Request {
//   User: User;
// }

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
      // console.log(payload);
      if (!userTypeName && !userTypeID) {
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await this.userService.insertToUserType(payload);
      if (!response) {
        throw new HttpException(
          {
            message: 'Usertype failed', // More specific message
          },
          HttpStatus.CONFLICT, // Use appropriate status code
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
      if (!userStatusID && !userStatusName) {
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await this.userService.insertToUserStatus(payload);
      if (!response) {
        throw new HttpException(
          {
            message: 'UserStatus failed', // More specific message
          },
          HttpStatus.CONFLICT, // Use appropriate status code
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
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST, // Use appropriate status code
        );
      }
      const response = await this.userService.deleteUser(userID);

      if (!response) {
        throw new HttpException(
          {
            message: 'User deletion failed', // More specific message
          },
          HttpStatus.CONFLICT, // Use appropriate status code
        );
      }
      return res.send(response);
    } catch (error) {
      // Consider logging the error here
      throw error; // Re-throw the original error
    }
  }

  @Post('Userdetails')
  async insertUserDetails(@Req() req: Request, @Res() res: Response) {
    try {
      const payload = req.body;
      if (!payload) {
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await this.userService.inserttoUserDetails(payload);
      if (!response) {
        throw new HttpException(
          {
            message: 'User Insertion failed', // More specific message
          },
          HttpStatus.CONFLICT, // Use appropriate status code
        );
      }
      return res.send(response);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
