import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TransactionService {

  constructor(
    // @ts-ignore
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    // @ts-ignore
    @InjectRepository(User)
    private readonly userRepository: Repository<Transaction>,

    // @ts-ignore
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Transaction>
  ) {

  }

  async create(createTransactionDto: CreateTransactionDto, userId) {
    const category = await this.categoryRepository.findOne({
      where: { id: +createTransactionDto.category }
    })

    if (!category) throw new NotFoundException('Category not found!')

    const user = await this.userRepository.findOne({
      where: { id: userId }
    })

    if (!user) throw new NotFoundException('User not Found!')

    const newTransaction = {
      title: createTransactionDto.title,
      amount: +createTransactionDto.amount,
      type: createTransactionDto.type,
      category,
      user
    }

    return this.transactionRepository.save(newTransaction)
  }

  async findAll(userId) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: userId
      },
      order: {
        createdAt: 'DESC'
      }
    })

    return transactions;
  }

  async remove(transactionId: number, userId) {
    const transaction = await this.transactionRepository.findOne({
      where: { 
        id: transactionId, 
        user: { id: userId }
      }
    })

    if (!transaction) throw new BadRequestException('Cannot find transaction or access denied')

    return await this.transactionRepository.remove(transaction)
  }
}
