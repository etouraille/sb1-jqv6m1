import { useState } from 'react';
import { Scale, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../../utils/cn';

const legalDocuments = [
  {
    id: 'terms',
    title: 'Conditions d\'utilisation',
    lastUpdated: new Date(),
    content: '# Conditions d\'utilisation\n\n...'
  },
  {
    id: 'privacy',
    title: 'Politique de confidentialité',
    lastUpdated: new Date(),
    content: '# Politique de confidentialité\n\n...'
  },
  {
    id: 'cookies',
    title: 'Politique des cookies',
    lastUpdated: new Date(),
    content: '# Politique des cookies\n\n...'
  },
  {
    id: 'refund',
    title: 'Politique de remboursement',
    lastUpdated: new Date(),
    content: '# Politique de remboursement\n\n...'
  }
];

export default function AdminLegal() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (docId: string) => {
    const doc = legalDocuments.find(d => d.id === docId);
    if (doc) {
      setSelectedDoc(docId);
      setEditContent(doc.content);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Document mis à jour');
      setIsEditing(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Conditions légales</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les documents légaux du site
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liste des documents */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Documents</h2>
          <div className="space-y-4">
            {legalDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{doc.title}</h3>
                  <p className="text-xs text-gray-500">
                    Dernière mise à jour : {doc.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(doc.id)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Éditeur */}
        {selectedDoc && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                {legalDocuments.find(d => d.id === selectedDoc)?.title}
              </h2>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center px-3 py-1 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Annuler
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-1 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Modifier
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4">
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-[500px] rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                />
              ) : (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: editContent }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}