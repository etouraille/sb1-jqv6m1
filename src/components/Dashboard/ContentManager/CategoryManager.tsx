import { useState } from 'react';
import { Plus, Edit2, Trash2, MoveVertical } from 'lucide-react';
import { CATEGORIES } from '../../../constants/categories';
import { cn } from '../../../utils/cn';

export default function CategoryManager() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const handleAddCategory = () => {
    // TODO: Implement category creation
  };

  const handleEditCategory = (categoryId: string) => {
    setEditingCategory(categoryId);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // TODO: Implement category deletion with confirmation
  };

  const handleReorderCategory = (categoryId: string, direction: 'up' | 'down') => {
    // TODO: Implement category reordering
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Catégories</h3>
        <button
          onClick={handleAddCategory}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une catégorie
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={cn(
              "flex items-center justify-between p-4",
              index !== categories.length - 1 && "border-b border-gray-200"
            )}
          >
            <div className="flex items-center space-x-4">
              <category.icon className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                <p className="text-sm text-gray-500">{category.subcategories.length} sous-catégories</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleReorderCategory(category.id, 'up')}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <MoveVertical className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleEditCategory(category.id)}
                className="p-1 text-gray-400 hover:text-blue-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}