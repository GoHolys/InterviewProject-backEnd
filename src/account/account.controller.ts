import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AccountDto, getBalanceDto, withdrawDto } from 'src/dto/account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('create')
  create(@Body() dto: AccountDto) {
    return this.accountService.create(dto);
  }
  @Get('balance')
  getBalance(@Body() dto: getBalanceDto) {
    const { id } = dto;
    return this.accountService.getBalance(id);
  }

  @Patch('withdraw')
  withdraw(@Body() dto: withdrawDto) {
    const { id, amount } = dto;
    return this.accountService.withdraw(id, amount);
  }
  @Patch('deposit')
  deposit(@Body() dto: withdrawDto) {
    const { id, amount } = dto;
    return this.accountService.deposit(id, amount);
  }

  block() {
    return 'I am blocked';
  }
}
