import { useState, useEffect, useRef } from 'react';
import { Search, X, History } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../utils/cn';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onSearch, placeholder = "Rechercher...", className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('search-history', []);
  const debouncedQuery = useDebounce(query, 300);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
      if (!searchHistory.includes(debouncedQuery)) {
        setSearchHistory(prev => [debouncedQuery, ...prev].slice(0, 5));
      }
    }
  }, [debouncedQuery]);

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    onSearch(term);
    setShowHistory(false);
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowHistory(false);
    }
  };

  return (
    <div ref={searchBarRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHistory(true)}
            placeholder={placeholder}
            className={cn(
              "w-full pl-10 pr-10 py-2 rounded-lg",
              "border border-gray-200",
              "focus:ring-2 focus:ring-red-500 focus:border-transparent",
              "placeholder:text-gray-400"
            )}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>

      {/* Historique de recherche */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-500">
              <span className="font-medium">Recherches récentes</span>
              <button
                onClick={clearHistory}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Effacer
              </button>
            </div>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(term)}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <History size={16} className="mr-2 text-gray-400" />
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}