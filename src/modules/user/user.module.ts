import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTypeService } from './entities/provider/usertype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeDetails } from './entities/usertype.entity';
import { UserStatusDetails } from './entities/userstatus.entity';
import { UserStatusService } from './entities/provider/userstatus.service';

@Module({
  imports: [
    // DatabaseModule,
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserTypeDetails, UserStatusDetails]),
  ],
  controllers: [UserController],
  providers: [UserService, UserTypeService, UserStatusService],
})
export class UserModule {}
