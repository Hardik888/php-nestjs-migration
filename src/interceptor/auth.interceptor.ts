import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';

import { Observable, map } from 'rxjs';
import { LoginDetailsService } from 'src/modules/auth/entities/provider/logindetail.service';
import { UserIDDto } from './userid.dto';

@Injectable()
export class UserIDInterceptor<T extends UserIDDto> implements NestInterceptor {
  private loginDetailsService: LoginDetailsService;
  constructor(private dto: ClassConstructor<T>) {}

  intercept(
    context: ExecutionContext,

    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Take the userMobileNo and userStatus from the request Context
    const request = context.switchToHttp().getRequest();

    const { userStatusID, userMobileNo } = request.body;

    return next.handle().pipe(
      map((data: T) => {
        const response = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
        // take the userId from the response Context
        const userID = response?.userID;
        const payload = { userID, userMobileNo };
        return payload;
      }),
    );
  }
}
