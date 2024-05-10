import { Expose } from 'class-transformer';

export class UserIDDto {
  @Expose()
  userID: number;
}
