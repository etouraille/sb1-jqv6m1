import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface ReportModalProps {
  adId: string;
  onClose: () => void;
}

export default function ReportModal({ adId, onClose }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement report submission
      console.log('Report submitted:', { adId, reason, description });
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasons = [
    'Contenu inapproprié',
    'Produit contrefait',
    'Prix abusif',
    'Arnaque potentielle',
    'Publicité trompeuse',
    'Autre'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium">Signaler l'annonce</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motif du signalement
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className={cn(
                "w-full rounded-lg border-gray-300",
                "focus:ring-red-500 focus:border-red-500"
              )}
            >
              <option value="">Sélectionner un motif</option>
              {reasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description détaillée
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className={cn(
                "w-full rounded-lg border-gray-300",
                "focus:ring-red-500 focus:border-red-500"
              )}
              placeholder="Décrivez le problème en détail..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "text-gray-700 bg-gray-100 hover:bg-gray-200"
              )}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "text-white bg-red-600 hover:bg-red-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? 'Envoi...' : 'Signaler'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}