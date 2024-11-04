import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function PaymentError() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Erreur de paiement
        </h2>
        <p className="mt-2 text-gray-600">
          Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Réessayer
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  );
}