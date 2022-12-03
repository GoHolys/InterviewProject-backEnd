import { ForbiddenException, Injectable } from '@nestjs/common';
import { TRANSACTION_TYPES } from 'src/consts';
import { AccountDto } from 'src/dto/account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private TransactionService: TransactionService,
  ) {}
  async create(dto: AccountDto) {
    try {
      const account = await this.prisma.account.create({
        data: {
          personId: dto.personId,
          balance: dto.balance,
          dailyWithdrawalLimit: dto.dailyWithdrawalLimit,
          activeFlag: dto.activeFlag,
          accountType: dto.accountType,
          createDate: dto.createDate,
        },
      });
      return account;
    } catch (error) {
      throw error;
    }
  }

  async getBalance(id: number) {
    try {
      const account = await this.prisma.account.findUnique({
        where: {
          id,
        },
      });
      if (!account) {
        throw new ForbiddenException('account does not exist');
      }
      return account.balance;
    } catch (error) {
      throw error;
    }
  }

  async findAccount(id: number) {
    try {
      const account = await this.prisma.account.findUnique({
        where: {
          id,
        },
      });
      if (!account) {
        throw new ForbiddenException('account does not exist');
      }
      return account;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(id: number, amount: number) {
    try {
      const { balance: currBalance, dailyWithdrawalLimit } =
        await this.findAccount(id);
      const todayTransactions = await this.TransactionService.findManyIdToday(
        id,
      );
      const dailyWithdrawTotal = todayTransactions.reduce(
        (accumulator, transaction) => (accumulator += transaction.value),
        0,
      );
      const newBalance =
        amount <= currBalance &&
        dailyWithdrawTotal < dailyWithdrawalLimit &&
        (await this.prisma.account.update({
          where: {
            id,
          },
          data: {
            balance: currBalance - amount,
          },
        }));
      if (!newBalance) {
        throw new ForbiddenException(
          'you cannot withdraw anymore (reached daily limit, or bank account value reached zero',
        );
      }
      this.TransactionService.create({
        accountId: id,
        value: amount,
        transactionType: TRANSACTION_TYPES.withdraw,
      });
      return newBalance.balance;
    } catch (error) {
      throw error;
    }
  }

  async deposit(id: number, amount: number) {
    try {
      const currBalance = await this.getBalance(id);
      const newBalance = await this.prisma.account.update({
        where: {
          id,
        },
        data: {
          balance: currBalance + amount,
        },
      });
      this.TransactionService.create({
        accountId: id,
        value: amount,
        transactionType: TRANSACTION_TYPES.withdraw,
      });
      return newBalance.balance;
    } catch (error) {
      throw error;
    }
  }
}
