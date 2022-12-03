import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PersonModule, AccountModule, TransactionModule, PrismaModule],
})
export class AppModule {}
