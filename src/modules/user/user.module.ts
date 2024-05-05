import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userTypeProvider } from './entities/provider/usertype.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTypeService } from './entities/provider/usertype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeDetails } from './entities/usertype.entity';

@Module({
  imports: [
    // DatabaseModule,
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserTypeDetails]),
  ],
  controllers: [UserController],
  providers: [
    // userTypeProvider, 
    UserService, UserTypeService],
})
export class UserModule {}
