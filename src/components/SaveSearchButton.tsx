import { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { cn } from '../utils/cn';

interface SaveSearchButtonProps {
  searchQuery: string;
  category?: string;
  location?: string;
}

export default function SaveSearchButton({ searchQuery, category, location }: SaveSearchButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = () => {
    setIsSaved(!isSaved);
    // TODO: Implémenter la sauvegarde de recherche
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 rounded-lg",
        "transition-colors",
        isSaved
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      )}
    >
      {isSaved ? (
        <>
          <BellOff size={20} />
          <span>Recherche sauvegardée</span>
        </>
      ) : (
        <>
          <Bell size={20} />
          <span>Sauvegarder la recherche</span>
        </>
      )}
    </button>
  );
}