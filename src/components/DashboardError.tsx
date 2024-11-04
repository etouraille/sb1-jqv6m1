import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';

export default function DashboardError() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  let title = 'Une erreur est survenue';
  let message = 'Nous sommes désolés, mais quelque chose s\'est mal passé.';
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Page non trouvée';
      message = 'La page que vous recherchez n\'existe pas ou a été déplacée.';
    } else if (error.status === 401) {
      title = 'Accès non autorisé';
      message = 'Vous devez être connecté pour accéder à cette page.';
    } else if (error.status === 403) {
      title = 'Accès refusé';
      message = 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {message}
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
          <button
            onClick={() => navigate(0)}
            className={cn(
              "flex items-center px-4 py-2 rounded-lg",
              "text-white bg-red-600 hover:bg-red-700"
            )}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );
}