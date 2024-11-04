import { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  BarChart, 
  Users, 
  Globe,
  ArrowRight,
  CheckCircle,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';
import AdRequestForm from '../components/AdRequestForm';

const adFormats = [
  {
    id: 'banner',
    name: 'Bannière Premium',
    description: 'Bannière publicitaire en haut des pages de recherche',
    price: 299,
    features: [
      'Position premium',
      'Visibilité maximale',
      'Ciblage par catégorie',
      'Statistiques détaillées'
    ],
    metrics: {
      views: '50K+',
      clicks: '2.5K+',
      ctr: '5%'
    }
  },
  {
    id: 'sidebar',
    name: 'Encart Latéral',
    description: 'Annonce dans la colonne latérale des pages produits',
    price: 199,
    features: [
      'Haute visibilité',
      'Format adaptatif',
      'Ciblage géographique',
      'Rapports de performance'
    ],
    metrics: {
      views: '30K+',
      clicks: '1.5K+',
      ctr: '4%'
    }
  },
  {
    id: 'native',
    name: 'Annonce Native',
    description: 'Intégration naturelle dans les listes d\'annonces',
    price: 149,
    features: [
      'Intégration naturelle',
      'Format authentique',
      'Ciblage comportemental',
      'Analytics en temps réel'
    ],
    metrics: {
      views: '25K+',
      clicks: '1K+',
      ctr: '3.5%'
    }
  }
];

export default function Advertising() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleRequestAd = (formatId: string) => {
    setSelectedFormat(formatId);
    setShowRequestForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boostez votre visibilité avec OCCASI.CH
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atteignez des milliers d'acheteurs potentiels avec nos solutions publicitaires ciblées
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Users className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">100K+</div>
            <div className="text-sm text-gray-600">Visiteurs mensuels</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Globe className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">26</div>
            <div className="text-sm text-gray-600">Cantons couverts</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <BarChart className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">4.8%</div>
            <div className="text-sm text-gray-600">Taux de conversion moyen</div>
          </div>
        </div>

        {/* Ad Formats */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Nos formats publicitaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adFormats.map((format) => (
              <div
                key={format.id}
                className={cn(
                  "bg-white rounded-lg shadow-sm overflow-hidden transition-all",
                  "border-2",
                  selectedFormat === format.id ? "border-red-500 ring-2 ring-red-500" : "border-transparent",
                  "hover:shadow-md"
                )}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {format.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {format.description}
                  </p>
                  <div className="text-2xl font-bold text-red-600 mb-4">
                    CHF {format.price}
                    <span className="text-sm font-normal text-gray-500">/mois</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {format.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Vues</div>
                        <div className="text-lg font-semibold text-gray-900">{format.metrics.views}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Clics</div>
                        <div className="text-lg font-semibold text-gray-900">{format.metrics.clicks}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">CTR</div>
                        <div className="text-lg font-semibold text-gray-900">{format.metrics.ctr}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRequestAd(format.id)}
                    className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    Demander un devis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-red-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Nos experts publicitaires sont là pour vous accompagner
          </p>
          <button 
            onClick={() => setShowRequestForm(true)}
            className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-50"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi choisir notre plateforme ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Target className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ciblage précis
              </h3>
              <p className="text-gray-600">
                Atteignez votre audience idéale avec nos options de ciblage avancées par localisation, catégorie et comportement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Performance mesurable
              </h3>
              <p className="text-gray-600">
                Suivez vos résultats en temps réel avec nos outils d'analyse détaillés et optimisez vos campagnes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DollarSign className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ROI optimisé
              </h3>
              <p className="text-gray-600">
                Maximisez votre retour sur investissement grâce à nos formats publicitaires performants et notre tarification transparente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de demande de publicité */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Demande de publicité
              </h3>
              <button
                onClick={() => setShowRequestForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <AdRequestForm
                format={selectedFormat as 'banner' | 'sidebar' | 'native'}
                onSubmit={() => setShowRequestForm(false)}
                onCancel={() => setShowRequestForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}