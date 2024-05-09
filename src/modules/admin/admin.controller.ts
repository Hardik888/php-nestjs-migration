import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { Req, Res } from '@nestjs/common';
import { LoginDetailsService } from '../auth/entities/provider/logindetail.service';

// interface ExtendedRequest extends Request {
//   User: User;
// }

@Controller('user')
export class AdminController {
  constructor(
    private userService: AdminService,
    private loginService: LoginDetailsService,
  ) {}
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
      this.errorbody();
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
        this.errorbody();
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
      throw error;
    }
  }

  @Post('Userdetails')
  async insertUserDetails(@Req() req: Request, @Res() res: Response) {
    try {
      const payload = req.body;
      const { userMobileNo } = payload;
      if (!payload) {
        this.errorbody();
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
      const id = response.identifiers[0].userID;
      this.loginService.iD(id);
      this.loginService.mobileNo(userMobileNo);
      const loginTransaction = await this.loginService.insert();
      return res.send({
        message: response,
        loginTransaction,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
