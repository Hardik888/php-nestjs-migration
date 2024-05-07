import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RandomUserIDInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { body } = req;

    if (body && body.userID !== undefined) {
      if (typeof body.userID !== 'number') {
        throw new Error('User ID must be a number');
      }
      body.userID = Math.floor(Math.random() * 2312121232);
    }

    return next.handle();
  }
}
