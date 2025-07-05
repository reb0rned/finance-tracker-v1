import { Controller, Post, Body, Request, UseGuards, UsePipes, ValidationPipe, Get, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req
  ) {
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.categoryService.findAll(+req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id') id: number,
    @Request() req
  ) {
    return this.categoryService.findOne(+id, +req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateOne(
    @Param('id') id: number,
    @Request() req,
    @Body() categoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateOne(+id, +req.user.id, categoryDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeOne(
    @Param('id') id: number,
    @Request() req
  ) {
    return this.categoryService.removeOne(+id, +req.user.id)
  }
}
