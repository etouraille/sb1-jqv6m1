import { Building, Users, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">À propos d'OCCASI.CH</h1>
          <p className="mt-4 text-lg text-gray-600">
            La première plateforme suisse de petites annonces locales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notre Histoire</h2>
            <p className="text-gray-600">
              Fondée en 2024, OCCASI.CH est née de la volonté de créer une plateforme moderne
              et conviviale pour les petites annonces en Suisse. Notre mission est de faciliter
              les échanges locaux et de promouvoir une consommation plus responsable.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nos Valeurs</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <Users className="h-5 w-5 text-red-600 mr-2" />
                Communauté et proximité
              </li>
              <li className="flex items-center">
                <Target className="h-5 w-5 text-red-600 mr-2" />
                Innovation et simplicité
              </li>
              <li className="flex items-center">
                <Award className="h-5 w-5 text-red-600 mr-2" />
                Qualité et confiance
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Chiffres Clés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">100K+</div>
              <div className="mt-2 text-gray-600">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">50K+</div>
              <div className="mt-2 text-gray-600">Annonces publiées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">26</div>
              <div className="mt-2 text-gray-600">Cantons couverts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}