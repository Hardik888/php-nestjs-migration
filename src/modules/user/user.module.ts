import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTypeService } from './entities/provider/usertype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeDetails } from './entities/usertype.entity';
import { UserStatusDetails } from './entities/userstatus.entity';
import { UserStatusService } from './entities/provider/userstatus.service';
import { UserdetailService } from './entities/provider/userdetails.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RandomUserIDInterceptor } from './interceptors/randomgenratedid.interceptor';
import { UserDetail } from './entities/userdetails.entity';

@Module({
  imports: [
    // DatabaseModule,
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserTypeDetails, UserStatusDetails, UserDetail]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserTypeService,
    UserStatusService,
    UserdetailService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RandomUserIDInterceptor,
    },
  ],
})
export class UserModule {}
