import { useState } from 'react';
import { Shield, Lock, Key, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../../utils/cn';

export default function AdminSecurity() {
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [isUpdatingCert, setIsUpdatingCert] = useState(false);

  const handleGenerateKey = async () => {
    setIsGeneratingKey(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Nouvelle clé API générée');
    } catch (error) {
      toast.error('Erreur lors de la génération de la clé');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleUpdateCertificate = async () => {
    setIsUpdatingCert(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Certificat SSL mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du certificat');
    } finally {
      setIsUpdatingCert(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sécurité</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les paramètres de sécurité
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Authentification */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Authentification</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Double authentification</p>
                <p className="text-sm text-gray-500">Requise pour tous les administrateurs</p>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-red-600">
                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Connexions simultanées</p>
                <p className="text-sm text-gray-500">Limiter à une seule session active</p>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-gray-200">
                <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>

        {/* API et Certificats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">API et Certificats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Clé API</p>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  value="sk_live_xxxxxxxxxxxxx"
                  readOnly
                  className="flex-1 rounded-lg border-gray-300 bg-gray-50 text-sm"
                />
                <button
                  onClick={handleGenerateKey}
                  disabled={isGeneratingKey}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    "text-white bg-red-600 hover:bg-red-700",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isGeneratingKey ? (
                    <RefreshCw className="animate-spin h-5 w-5" />
                  ) : (
                    'Générer'
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Certificat SSL</p>
              <p className="text-sm text-gray-500">Expire dans 45 jours</p>
              <button
                onClick={handleUpdateCertificate}
                disabled={isUpdatingCert}
                className={cn(
                  "mt-2 px-4 py-2 rounded-lg text-sm font-medium",
                  "text-white bg-red-600 hover:bg-red-700",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isUpdatingCert ? (
                  <RefreshCw className="animate-spin h-5 w-5" />
                ) : (
                  'Mettre à jour'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Journal d'activité */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Journal d'activité</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Connexion réussie
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      admin@occasi.ch
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      192.168.1.1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date().toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}