import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AdminModule, AuthModule],
})
export class AppModule {}
