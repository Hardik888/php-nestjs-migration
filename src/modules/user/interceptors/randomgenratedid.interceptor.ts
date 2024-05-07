import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RandomUserIDIntercetor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.body && req.body.userID) {
      const randomID = Math.floor(Math.random() * 2312);
      req.body.userID = randomID;
    }
    return next.handle();
  }
}
