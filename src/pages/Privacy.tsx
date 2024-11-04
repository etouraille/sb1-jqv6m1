import { Lock } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Politique de confidentialité</h1>
          <p className="mt-4 text-lg text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-CH')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-red max-w-none">
            <h2>1. Collecte des données</h2>
            <p>
              Nous collectons les informations suivantes :
            </p>
            <ul>
              <li>Informations de compte (nom, email, téléphone)</li>
              <li>Données de navigation et d'utilisation</li>
              <li>Informations de transaction</li>
              <li>Communications avec le service client</li>
            </ul>

            <h2>2. Utilisation des données</h2>
            <p>
              Vos données sont utilisées pour :
            </p>
            <ul>
              <li>Fournir et améliorer nos services</li>
              <li>Personnaliser votre expérience</li>
              <li>Communiquer avec vous</li>
              <li>Assurer la sécurité de la plateforme</li>
            </ul>

            <h2>3. Protection des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
              contre tout accès, modification, divulgation ou destruction non autorisé.
            </p>

            <h2>4. Partage des données</h2>
            <p>
              Nous ne partageons vos données qu'avec :
            </p>
            <ul>
              <li>Les autres utilisateurs (selon vos paramètres)</li>
              <li>Nos prestataires de services</li>
              <li>Les autorités (si requis par la loi)</li>
            </ul>

            <h2>5. Vos droits</h2>
            <p>
              Vous avez le droit de :
            </p>
            <ul>
              <li>Accéder à vos données</li>
              <li>Rectifier vos données</li>
              <li>Supprimer vos données</li>
              <li>Limiter le traitement</li>
              <li>Porter vos données</li>
              <li>Vous opposer au traitement</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez contrôler
              l'utilisation des cookies dans les paramètres de votre navigateur.
            </p>

            <h2>7. Modifications</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications
              seront publiées sur cette page.
            </p>

            <h2>8. Contact</h2>
            <p>
              Pour toute question concernant notre politique de confidentialité, contactez-nous à :
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