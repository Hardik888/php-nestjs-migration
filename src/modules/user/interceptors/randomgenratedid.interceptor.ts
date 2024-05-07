import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable()
export class RandomUserIDInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { body } = req;
    let uuid = uuidv4();
    console.log(uuid);
    if (body && body.userID !== undefined) {
      if (typeof body.userID !== 'string') {
        throw new Error('User ID must be a number');
      }
      body.userID = uuid as number;
    }

    return next.handle();
  }
}
