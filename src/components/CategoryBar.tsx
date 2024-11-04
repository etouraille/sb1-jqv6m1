import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants/categories';
import { cn } from '../utils/cn';

interface CategoryBarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryBar({ selectedCategory, onCategorySelect }: CategoryBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId === selectedCategory ? null : categoryId);
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className={cn(
      "sticky top-0 z-10 bg-white border-b",
      isScrolled && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 overflow-x-auto py-4 scrollbar-hide">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "flex flex-col items-center space-y-1 min-w-fit",
                  "text-sm font-medium transition-colors",
                  selectedCategory === category.id
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon className="h-6 w-6" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}