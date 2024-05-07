import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from 'src/modules/user/entities/userdetails.entity';
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
      database: 'test',
      entities: [UserTypeDetails, UserStatusDetails, UserDetail],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
