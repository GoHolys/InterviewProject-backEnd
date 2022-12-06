import { Injectable } from '@nestjs/common';
import { TRANSACTION_TYPES } from 'src/consts';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}
  async create(dto: TransactionDto) {
    try {
      const transaction = await this.prisma.transaction.create({
        data: {
          accountId: dto.accountId,
          value: dto.value,
          transactiontype: dto.transactionType,
        },
      });
      return transaction;
    } catch (error) {
      throw error;
    }
  }
  async findAll() {
    try {
      const transactions = this.prisma.transaction.findMany({});
      return transactions;
    } catch (error) {
      throw error;
    }
  }
  async findManyIdToday(accountId: number) {
    try {
      const transactions = this.prisma.transaction.findMany({
        where: {
          accountId: accountId,
          transactiontype: TRANSACTION_TYPES.withdraw,
          transactionDate:{
            lte: new Date(),
            gte: new Date(new Date().setHours(0,0,0,0))
          }
        },
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
