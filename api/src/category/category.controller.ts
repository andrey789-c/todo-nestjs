import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  findAll() {
    return this.categoryService.findAll();
  }

  @Post('/')
  createCategory( @Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }
}
