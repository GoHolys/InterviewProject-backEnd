import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transacationService: TransactionService) {}
  @Post('create')
  async create(@Body() dto: TransactionDto) {
    return await this.transacationService.create(dto);
  }
  @Get('findAll')
  async findAll() {
    return await this.transacationService.findAll();
  }
  @Get('findManyIdToday')
  async findManyIdToday(@Body('id') id: number) {
    return await this.transacationService.findManyIdToday(id);
  }
}
