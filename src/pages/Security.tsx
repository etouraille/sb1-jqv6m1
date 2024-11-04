import { Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Security() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Sécurité</h1>
          <p className="mt-4 text-lg text-gray-600">
            Votre sécurité est notre priorité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Protection des données</h2>
            </div>
            <p className="text-gray-600">
              Vos données personnelles sont cryptées et stockées de manière sécurisée.
              Nous ne partageons jamais vos informations avec des tiers sans votre consentement.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Transactions sécurisées</h2>
            </div>
            <p className="text-gray-600">
              Toutes les transactions sont protégées par un système de paiement sécurisé.
              Nous surveillons en permanence les activités suspectes.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Conseils de sécurité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">À faire</h3>
              <ul className="space-y-4">
                {[
                  "Rencontrez le vendeur dans un lieu public",
                  "Vérifiez l'objet avant l'achat",
                  "Utilisez notre système de messagerie",
                  "Signalez tout comportement suspect"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">À éviter</h3>
              <ul className="space-y-4">
                {[
                  "Ne communiquez pas en dehors de la plateforme",
                  "N'envoyez jamais d'argent à l'avance",
                  "Ne partagez pas vos informations bancaires",
                  "Ne cliquez pas sur des liens suspects"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-8 text-center">
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Vous avez repéré une activité suspecte ?
          </h2>
          <p className="text-gray-600 mb-4">
            Signalez-la immédiatement à notre équipe de modération
          </p>
          <a
            href="/report"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Signaler un problème
          </a>
        </div>
      </div>
    </div>
  );
}