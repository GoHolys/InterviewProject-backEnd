import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports:[PrismaModule, TransactionModule],
    controllers:[AccountController],
    providers:[AccountService]
})
export class AccountModule {}
