import { IsBoolean, IsNumber, IsOptional, isString, IsString } from "class-validator"

export class TodosCreateDto {
  @IsString({message: 'Введите название'})
  title: string;

  @IsOptional()
  @IsString()
  description?: string = 'Описание';

  @IsOptional()
  @IsBoolean()
  done?: boolean = true;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

export type ITodosUpdateDto = Partial<TodosCreateDto>