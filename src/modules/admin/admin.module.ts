import { Module, forwardRef } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserTypeService } from './entities/provider/usertype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeDetails } from './entities/usertype.entity';
import { UserStatusDetails } from './entities/userstatus.entity';
import { UserStatusService } from './entities/provider/userstatus.service';
import { UserdetailService } from './entities/provider/userdetails.service';
import { UserDetail } from './entities/userdetails.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserTypeDetails, UserStatusDetails, UserDetail]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UserTypeService,
    UserStatusService,
    UserdetailService,
  ],
})
export class AdminModule {}
