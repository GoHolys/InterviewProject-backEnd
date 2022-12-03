import { isNotEmpty, isString, isEmail } from 'class-validator';

export class AccountDto {
  personId: number;
  balance: number;
  dailyWithdrawalLimit: number;
  activeFlag: boolean;
  accountType: number;
  createDate: Date;
}
export class getBalanceDto {
  id:number
}

export class withdrawDto{
  id:number;
  amount:number;
}
