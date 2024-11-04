import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface Page {
  id: string;
  title: string;
  slug: string;
  lastModified: Date;
  status: 'published' | 'draft';
}

const samplePages: Page[] = [
  {
    id: '1',
    title: 'À propos',
    slug: 'about',
    lastModified: new Date(),
    status: 'published'
  },
  {
    id: '2',
    title: 'Conditions d\'utilisation',
    slug: 'terms',
    lastModified: new Date(),
    status: 'published'
  },
  {
    id: '3',
    title: 'Politique de confidentialité',
    slug: 'privacy',
    lastModified: new Date(),
    status: 'draft'
  }
];

export default function PageManager() {
  const [pages, setPages] = useState(samplePages);
  const [editingPage, setEditingPage] = useState<string | null>(null);

  const handleAddPage = () => {
    // TODO: Implement page creation
  };

  const handleEditPage = (pageId: string) => {
    setEditingPage(pageId);
  };

  const handleDeletePage = (pageId: string) => {
    // TODO: Implement page deletion with confirmation
  };

  const handlePreviewPage = (pageId: string) => {
    // TODO: Implement page preview
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Pages</h3>
        <button
          onClick={handleAddPage}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Créer une page
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className={cn(
              "flex items-center justify-between p-4",
              index !== pages.length - 1 && "border-b border-gray-200"
            )}
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900">{page.title}</h4>
              <p className="text-sm text-gray-500">/{page.slug}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-full",
                page.status === 'published' 
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              )}>
                {page.status === 'published' ? 'Publié' : 'Brouillon'}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreviewPage(page.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditPage(page.id)}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePage(page.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}