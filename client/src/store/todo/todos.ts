import { create } from "zustand";
import { ITodoState } from "./todos.model";
import { createTodo, getTodos, updateTodo, createCategory, addTodoToCategory, getCategories } from "../../api/todos/todos";
import { ITodoCreate } from "../../api/todos/todos.model";

export const useTodoStore = create<ITodoState>((set) => ({
  todos: [],
  categories: [],
  getTodos: async () => {
    const res = await getTodos();
    set({ todos: res });
  },
  addTodo: async (todo: ITodoCreate) => {
    const res = await createTodo(todo);
    if (todo.categoryId) {
      const updatedTodo = await addTodoToCategory(res.id, todo.categoryId);
      set((state) => ({ todos: [...state.todos, updatedTodo] }));
    } else {
      set((state) => ({ todos: [...state.todos, res] }));
    }
  },
  updateTodo: async (id: number) => {
    const res = await updateTodo(id);
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...res } : todo
      ),
    }));
  },
  addCategory: async (name: string) => {
    const res = await createCategory(name);
    set((state) => ({
      categories: [...state.categories, res]
    }));
  },
  getCategories: async () => {
    const res = await getCategories();
    set({ categories: res });
  }
}));


