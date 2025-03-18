import React, { useState, useEffect } from 'react';
import { useTodoStore } from '../store/todo/todos';
import { CategoryManager } from '../components/category/CategoryManager';

export const CreateTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const { addTodo, categories, addCategory, getCategories } = useTodoStore();

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({ title, description, categoryId: selectedCategory });
    setTitle('');
    setDescription('');
    setSelectedCategory(undefined);
  };

  const handleAddCategory = (name: string) => {
    addCategory(name);
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <CategoryManager onAddCategory={handleAddCategory} />
      
      <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg shadow-md p-5">
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2 font-bold">Category:</label>
          <select
            id="category"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full p-2 rounded border border-gray-300"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-bold">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-bold">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 rounded border border-gray-300 min-h-[100px]"
          />
        </div>

        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Todo
        </button>
      </form>
    </div>
  );
};
