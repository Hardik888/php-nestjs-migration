import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from 'src/modules/admin/entities/userdetails.entity';
import { UserStatusDetails } from 'src/modules/admin/entities/userstatus.entity';
import { UserTypeDetails } from 'src/modules/admin/entities/usertype.entity';
import { LoginDetail } from 'src/modules/auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306, // Default port for MariaDB
      username: 'migration',
      password: 'password',
      database: 'MIGRATION',
      entities: [UserTypeDetails, UserStatusDetails, UserDetail, LoginDetail],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
