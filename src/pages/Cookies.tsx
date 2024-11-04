import { Cookie } from 'lucide-react';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Politique des cookies</h1>
          <p className="mt-4 text-lg text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-CH')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-red max-w-none">
            <h2>1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez
              notre site. Les cookies nous aident à faire fonctionner le site, à le rendre plus
              sûr et à vous offrir une meilleure expérience.
            </p>

            <h2>2. Types de cookies utilisés</h2>
            
            <h3>Cookies essentiels</h3>
            <p>
              Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.
            </p>
            <ul>
              <li>Session de connexion</li>
              <li>Panier d'achats</li>
              <li>Sécurité</li>
            </ul>

            <h3>Cookies de performance</h3>
            <p>
              Nous aident à comprendre comment vous utilisez le site.
            </p>
            <ul>
              <li>Google Analytics</li>
              <li>Statistiques de visite</li>
              <li>Performances du site</li>
            </ul>

            <h3>Cookies de fonctionnalité</h3>
            <p>
              Permettent d'améliorer votre expérience utilisateur.
            </p>
            <ul>
              <li>Préférences de langue</li>
              <li>Historique de recherche</li>
              <li>Personnalisation</li>
            </ul>

            <h2>3. Gestion des cookies</h2>
            <p>
              Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez :
            </p>
            <ul>
              <li>Via les paramètres de votre navigateur</li>
              <li>Via notre panneau de préférences</li>
              <li>Via des outils tiers</li>
            </ul>

            <h2>4. Impact du refus des cookies</h2>
            <p>
              Le refus des cookies peut impacter certaines fonctionnalités du site :
            </p>
            <ul>
              <li>Connexion automatique</li>
              <li>Préférences personnalisées</li>
              <li>Certaines fonctionnalités avancées</li>
            </ul>

            <h2>5. Durée de conservation</h2>
            <p>
              La durée de conservation des cookies varie selon leur type :
            </p>
            <ul>
              <li>Cookies de session : supprimés à la fermeture du navigateur</li>
              <li>Cookies persistants : jusqu'à 13 mois maximum</li>
            </ul>

            <h2>6. Contact</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies, contactez-nous à :
              <a href="mailto:privacy@occasi.ch" className="text-red-600 hover:text-red-700">
                privacy@occasi.ch
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}