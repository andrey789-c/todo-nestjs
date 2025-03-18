import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ITodosUpdateDto, TodosCreateDto } from './dto/todos.dto';
import { AddTodoCategoryDto } from './dto/add-todo-category.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.todo.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        category: true,
        categoryId: false,
      },
      where: {
        userId
      }
    });
  }

  
  async create(dto: TodosCreateDto, userId: number) {

    try {
      return this.prisma.todo.create({
        data: {
          title: dto.title,
          description: dto.description || '',
          done: false,
          categoryId: dto.categoryId || null,
          userId
        },
        select: {
          id: true,
          title: true,
          description: true,
          done: true,
          category: true,
          categoryId: false,
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async updateDoneStatus(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      throw new Error('Задача не найдена');
    }

    return this.prisma.todo.update({
      where: { id },
      data: { done: true },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        category: true,
        categoryId: false,
      },
    });
  }

  async addTodoCategory(id: number, dto: AddTodoCategoryDto) {
    const todo = await this.prisma.todo.findUnique({ where: { id: id } });

    if (!todo) {
      throw new Error('Задача не найдена');
    }

    return this.prisma.todo.update({
      where: { id },
      data: { category: { connect: { id: dto.id } } },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        category: true,
        categoryId: false,
      },
    });
  }
}
