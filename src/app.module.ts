import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeDetails } from './modules/user/entities/usertype.entity';
@Module({
  imports: [
    // DatabaseModule,
    // TypeOrmModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      url: 'mysql://root:Root@1234@localhost:3306/MIGRATION',
      username: 'root',
      password: 'Root@1234',
      database: 'MIGRATION',
      entities: [UserTypeDetails],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
