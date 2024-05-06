import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusDetails } from 'src/modules/user/entities/userstatus.entity';
import { UserTypeDetails } from 'src/modules/user/entities/usertype.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306, // Default port for MariaDB
      username: 'migration',
      password: 'password',
      database: 'MIGRATION',
      entities: [UserTypeDetails, UserStatusDetails],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
