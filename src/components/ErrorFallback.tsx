import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
  message?: string;
}

export default function ErrorFallback({ error, resetErrorBoundary, message }: ErrorFallbackProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {message || 'Une erreur est survenue'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Nous sommes désolés, mais quelque chose s'est mal passé. Veuillez réessayer.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className={cn(
              "flex items-center px-4 py-2 rounded-lg",
              "text-gray-700 bg-gray-100 hover:bg-gray-200"
            )}
          >
            <Home className="w-4 h-4 mr-2" />
            Accueil
          </button>
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg",
                "text-white bg-red-600 hover:bg-red-700"
              )}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Réessayer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}