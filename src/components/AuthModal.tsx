import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function AuthModal({ isOpen, onClose, message }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-medium">Connexion requise</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            {message || 'Connectez-vous pour accéder à cette fonctionnalité.'}
          </p>

          <div className="space-y-4">
            <Link
              to="/login"
              className={cn(
                "block w-full text-center px-4 py-2 rounded-lg",
                "bg-red-600 text-white hover:bg-red-700"
              )}
              onClick={onClose}
            >
              Se connecter
            </Link>
            
            <Link
              to="/register"
              className={cn(
                "block w-full text-center px-4 py-2 rounded-lg",
                "border border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
              onClick={onClose}
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}