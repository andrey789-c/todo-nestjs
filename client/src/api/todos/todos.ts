import axios from "axios";
import Cookies from "js-cookie";
import { ICategory, ITodo, ITodoCreate } from "./todos.model";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = Cookies.get("auth");
  return {
    Authorization: `Bearer ${token}`
  };
};

export const getTodos = async () => {
  const res = await axios.get<ITodo[]>(`${API_URL}/todos`, {
    headers: getAuthHeader()
  });

  if (res.status === 401) {
    throw new Error("Not Authenticated");
  }

  return res.data;
};

export const createTodo = async (todo: ITodoCreate) => {
  const res = await axios.post<ITodo>(`${API_URL}/todos`, todo, {
    headers: getAuthHeader()
  });

  if (res.status === 401) {
    throw new Error("Not Authenticated");
  }

  return res.data;
};

export const updateTodo = async (id: number) => {
  const res = await axios.post<ITodo>(`${API_URL}/todos/${id}/complete`, {}, {
    headers: getAuthHeader()
  });

  if (res.status === 401) {
    throw new Error("Not Authenticated");
  }

  return res.data;
};

export const createCategory = async (name: string): Promise<ICategory> => {
  const res = await axios.post<ICategory>(`${API_URL}/category`, { name }, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 401) {
    throw new Error("Not Authenticated");
  }

  return res.data;
};

export const addTodoToCategory = async (todoId: number, categoryId: number): Promise<ITodo> => {
  const res = await axios.post<ITodo>(`${API_URL}/todos/${todoId}/category`, { id: categoryId }, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 401) {
    throw new Error("Not Authenticated");
  }

  return res.data;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const res = await axios.get<ICategory[]>(`${API_URL}/category`, {
    headers: getAuthHeader()
  });

  if (res.status === 401) {
    throw new Error("Not Authenticated");
  }

  return res.data;
};
