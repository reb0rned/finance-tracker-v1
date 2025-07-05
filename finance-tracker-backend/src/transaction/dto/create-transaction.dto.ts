import { IsIn, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"
import { Category } from "src/category/entities/category.entity"
import { User } from "src/user/entities/user.entity"

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsString()
  @MinLength(6)
  @IsIn(['expense', 'income'])
  type: 'expense' | 'income'

  @IsNotEmpty()
  @IsNumber()
  category: Category
}
