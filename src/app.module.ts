import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { CacheModule } from '@nestjs/cache-manager';
import { StripeModule } from './modules/stripe/stripe.module';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    DatabaseModule,
    AdminModule,
    AuthModule,

    InvestmentModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 2000,
    }),
    StripeModule.forRootAsync(),
  ],
})
export class AppModule {}
