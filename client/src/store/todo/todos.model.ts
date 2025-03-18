import { ITodo, ITodoCreate, ICategory } from "../../api/todos/todos.model";

export interface ITodoState {
  todos: ITodo[];
  categories: ICategory[];
  getTodos: () => Promise<void>;
  addTodo: (todo: ITodoCreate) => Promise<void>;
  updateTodo: (id: number) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  getCategories: () => Promise<void>;
}