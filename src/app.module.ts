import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { InvestmentModule } from './modules/investment/investment.module';

@Module({
  imports: [DatabaseModule, AdminModule, AuthModule, InvestmentModule],
})
export class AppModule {}
