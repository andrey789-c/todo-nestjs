import React from 'react';
import { ITodo } from '../api/todos/todos.model';
import { useTodoStore } from '../store/todo/todos';

interface TodoListProps {
  todos: ITodo[];
  onToggle: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  const { updateTodo } = useTodoStore();

  const handleUpdateTodo = (id: number) => {
    updateTodo(id);
  };

  return (
    <div className="p-4 grid gap-2">
      {todos.map((todo) => (
        <div onClick={() => handleUpdateTodo(todo.id)} key={todo.id} className="flex items-center p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <input
            type="checkbox"
            checked={todo.done}
            className="mr-4 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-lg font-semibold ${todo.done ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </h3>
              {todo.category && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {todo.category.name}
                </span>
              )}
            </div>
            <p className="text-gray-600">{todo.description}</p>
          </div>
          <button
            onClick={() => handleUpdateTodo(todo.id)}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            ↻
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
