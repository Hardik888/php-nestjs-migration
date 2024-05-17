import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { CacheModule } from '@nestjs/cache-manager';
import { StripeModule } from './modules/stripe/stripe.module';
import * as redisStore from 'cache-manager-redis-store';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RawBodyMiddleware } from './middleware/rawbody.middleware';
import { JsonBodyMiddleware } from './middleware/jsonbody.middleware';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/client'), // Adjust for your environment
    }),
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
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/webhook/create',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
