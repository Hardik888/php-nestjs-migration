import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RandomUserIDIntercetor } from '../src/modules/user/interceptors/randomgenratedid.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new RandomUserIDIntercetor());
  await app.listen(3000);
}
bootstrap();
