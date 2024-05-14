import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from 'src/modules/admin/entities/userdetails.entity';
import { UserStatusDetails } from 'src/modules/admin/entities/userstatus.entity';
import { UserTypeDetails } from 'src/modules/admin/entities/usertype.entity';
import { LoginDetail } from 'src/modules/auth/entities/auth.entity';
import {
  InvestmentDetail,
  CurrentInvestment,
  BankDetail,
  InvestmentDuration,
} from '../modules/investment/entities/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('mysql_host'),
          port: configService.get('mysql_port'),
          username: configService.get('mysql_user'),
          password: configService.get('mysql_password'),
          database: configService.get('mysql_database'),
          entities: [
            UserTypeDetails,
            UserStatusDetails,
            UserDetail,
            LoginDetail,
            InvestmentDetail,
            CurrentInvestment,
            BankDetail,
            InvestmentDuration,
          ],
          synchronize: true,
        };
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/Migration'),
  ],

  exports: [TypeOrmModule],
})
export class DatabaseModule {}
