import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeDetails } from './modules/user/entities/usertype.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mariadb',
    //   host: '127.0.0.1',
    //   port: 3306, // Default port for MariaDB
    //   username: 'migration',
    //   password: 'password',
    //   database: 'MIGRATION',
    //   entities: [UserTypeDetails],
    //   synchronize: true,
    // }),
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
