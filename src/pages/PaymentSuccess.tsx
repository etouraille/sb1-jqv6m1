import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Paiement réussi !
        </h2>
        <p className="mt-2 text-gray-600">
          Merci pour votre paiement. Vous allez être redirigé vers votre tableau de bord.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retour au tableau de bord
        </button>
      </div>
    </div>
  );
}