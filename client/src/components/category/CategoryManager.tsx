import React, { useState } from 'react';

interface CategoryManagerProps {
  onAddCategory: (name: string) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ onAddCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory(name);
    setName('');
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
      >
        <span className="mr-2">+</span> Add Category
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Category
            </button>
          </div>
        </form>
      )}
    </div>
  );
}; 