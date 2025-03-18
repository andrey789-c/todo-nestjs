import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosCreateDto } from './dto/todos.dto';
import { AddTodoCategoryDto } from './dto/add-todo-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() request: { user: { id: number } }) {
    const userId = request.user.id;
    return this.todosService.findAll(userId);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createTodo(@Body() dto: TodosCreateDto, @Req() request: { user: { id: number } }) {
    return this.todosService.create(dto, request.user.id)
  }

  @Post('/:id/complete')
  @UseGuards(JwtAuthGuard)
  updateDoneStatus(@Param('id') id: string) {
    return this.todosService.updateDoneStatus(Number(id))
  }

  
  @Post('/:id/category')
  @UseGuards(JwtAuthGuard)
  addTodoCategory(@Param('id') id: string, @Body() dto: AddTodoCategoryDto) {
    return this.todosService.addTodoCategory(Number(id), dto)
  }
}
