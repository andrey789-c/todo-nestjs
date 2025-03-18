import { Body, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Injectable()
export class CategoryService {


  constructor(private readonly prisma: PrismaService) {}

  
  findAll() {
    return this.prisma.category.findMany();
  }

  createCategory(@Body() dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
  }
}
