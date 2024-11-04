import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Mail } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'welcome' | 'notification' | 'marketing' | 'system';
  lastModified: Date;
}

const sampleTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Bienvenue',
    subject: 'Bienvenue sur OCCASI.CH',
    type: 'welcome',
    lastModified: new Date()
  },
  {
    id: '2',
    name: 'Nouveau message',
    subject: 'Vous avez reçu un nouveau message',
    type: 'notification',
    lastModified: new Date()
  },
  {
    id: '3',
    name: 'Newsletter mensuelle',
    subject: 'Les meilleures offres du mois',
    type: 'marketing',
    lastModified: new Date()
  }
];

export default function EmailTemplateManager() {
  const [templates, setTemplates] = useState(sampleTemplates);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);

  const handleAddTemplate = () => {
    // TODO: Implement template creation
  };

  const handleEditTemplate = (templateId: string) => {
    setEditingTemplate(templateId);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // TODO: Implement template deletion with confirmation
  };

  const handlePreviewTemplate = (templateId: string) => {
    // TODO: Implement template preview
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Templates Email</h3>
        <button
          onClick={handleAddTemplate}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Créer un template
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {templates.map((template, index) => (
          <div
            key={template.id}
            className={cn(
              "flex items-center justify-between p-4",
              index !== templates.length - 1 && "border-b border-gray-200"
            )}
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-500">{template.subject}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-full",
                {
                  'bg-blue-100 text-blue-800': template.type === 'welcome',
                  'bg-yellow-100 text-yellow-800': template.type === 'notification',
                  'bg-green-100 text-green-800': template.type === 'marketing',
                  'bg-gray-100 text-gray-800': template.type === 'system'
                }
              )}>
                {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreviewTemplate(template.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditTemplate(template.id)}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
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