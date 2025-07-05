import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req
  ) {
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Request() id: number
  ) {
    return this.transactionService.findAll(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id') id: number,
    @Request() req
  ) {
    return this.transactionService.remove(+id, +req.user.id);
  }
}
