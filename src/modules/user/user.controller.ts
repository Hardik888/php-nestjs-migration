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
      const payload = req.body;
      if (!payload) {
        throw new HttpException(
          {
            message: 'Invalid Fields',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const reponse = await this.userService.insertToUserType(payload);
      return res.json(reponse);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }
}
