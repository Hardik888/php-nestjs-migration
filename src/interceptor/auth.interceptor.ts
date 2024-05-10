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
    return next.handle().pipe(
      map((data: T) => {
        const response = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
        const id = response?.userID;
        const mobileNo = response?.userMobileNo;
        if (response) this.loginDetailsService.iD(id);
        this.loginDetailsService.mobileNo(mobileNo);
        return response;
      }),
    );
  }
}
