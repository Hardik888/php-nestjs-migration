import { Status } from '../entities';

export type Investment = {
  userID: number;
  bankID: number;
  durationID: number;
  maturityID: number;
  loginID: number;
  investmentDetail: Status;
  investmentTotal: number;
};
