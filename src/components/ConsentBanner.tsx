import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours true
    analytics: false,
    marketing: false,
  });
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPreferences);
    saveConsent(newPreferences);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white border-t shadow-lg">
      {!showPreferences ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Cookie className="h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-600">
                Nous utilisons des cookies pour améliorer votre expérience. En continuant à utiliser ce site, vous acceptez notre{' '}
                <Link to="/privacy" className="text-red-600 hover:text-red-500">
                  politique de confidentialité
                </Link>
                {' '}et nos{' '}
                <Link to="/cookies" className="text-red-600 hover:text-red-500">
                  paramètres de cookies
                </Link>.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreferences(true)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Personnaliser
              </button>
              <button
                onClick={handleAcceptAll}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white rounded-lg",
                  "bg-red-600 hover:bg-red-700"
                )}
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Paramètres des cookies</h3>
              <p className="mt-1 text-sm text-gray-600">
                Gérez vos préférences de cookies
              </p>
            </div>
            <button
              onClick={() => setShowPreferences(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="necessary"
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="h-4 w-4 text-red-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="necessary" className="font-medium text-gray-700">
                  Cookies nécessaires
                </label>
                <p className="text-sm text-gray-500">
                  Ces cookies sont indispensables au fonctionnement du site.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="analytics"
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    analytics: e.target.checked
                  }))}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="analytics" className="font-medium text-gray-700">
                  Cookies analytiques
                </label>
                <p className="text-sm text-gray-500">
                  Nous aident à comprendre comment vous utilisez le site.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketing"
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    marketing: e.target.checked
                  }))}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="marketing" className="font-medium text-gray-700">
                  Cookies marketing
                </label>
                <p className="text-sm text-gray-500">
                  Permettent d'afficher des publicités pertinentes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setShowPreferences(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Enregistrer les préférences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}