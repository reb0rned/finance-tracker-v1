import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  constructor(
    // @ts-ignore
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
    ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isCategoryExist = await this.categoryRepository.findBy({
      user: { id: id },
      title: createCategoryDto.title
    })

    if (isCategoryExist.length) {
      throw new BadRequestException('This category already exist!')
    }

    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id
      }
    }

    return await this.categoryRepository.save(newCategory)
  }

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: {
        user: { id } 
      },
      relations: {
        transactions: true //подгружаем сразу транзы в нагрузку
      }
    }) 
  }

  async findOne(categoryId, userId) {
    const category = await this.categoryRepository.findOne({
      where: { 
        id: categoryId,
        user: { id: userId }
      },
      relations: {
        user: true,
        transactions: true,
      }
    })

    if (!category) {
      throw new NotFoundException('Category not found or access denied!')
    }

    return category
  } 

  async updateOne(categoryId, userId, categoryDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
        user: { id: userId }
      }
    })

    if (!category) {
      throw new BadRequestException('Category not found or access denied!')
    }

    Object.assign(category, categoryDto);
    return await this.categoryRepository.save(category);
  }

  async removeOne(categoryId, userId) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
        user: { id: userId }
      }
    })

    if (!category) {
      throw new NotFoundException('Category not found or access denied!');
    }

    return this.categoryRepository.remove(category)
  }
}
