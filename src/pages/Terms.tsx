import { Scale } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Conditions d'utilisation</h1>
          <p className="mt-4 text-lg text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-CH')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-red max-w-none">
            <h2>1. Acceptation des conditions</h2>
            <p>
              En accédant et en utilisant OCCASI.CH, vous acceptez d'être lié par ces conditions
              d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>

            <h2>2. Description du service</h2>
            <p>
              OCCASI.CH est une plateforme de petites annonces en ligne permettant aux utilisateurs
              de publier et de consulter des annonces pour vendre ou acheter des biens et services.
            </p>

            <h2>3. Inscription et compte</h2>
            <ul>
              <li>Vous devez avoir au moins 18 ans pour créer un compte</li>
              <li>Les informations fournies doivent être exactes et à jour</li>
              <li>Vous êtes responsable de la confidentialité de votre compte</li>
            </ul>

            <h2>4. Publication d'annonces</h2>
            <p>
              Les annonces doivent respecter nos règles de publication, notamment :
            </p>
            <ul>
              <li>Être légales et authentiques</li>
              <li>Ne pas enfreindre les droits de tiers</li>
              <li>Inclure des informations précises et véridiques</li>
            </ul>

            <h2>5. Responsabilités</h2>
            <p>
              OCCASI.CH n'est pas responsable des transactions entre utilisateurs. Nous agissons
              uniquement en tant qu'intermédiaire facilitant la mise en relation.
            </p>

            <h2>6. Propriété intellectuelle</h2>
            <p>
              Tout le contenu du site est protégé par les droits de propriété intellectuelle.
              L'utilisation non autorisée est strictement interdite.
            </p>

            <h2>7. Modification des conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
              entrent en vigueur dès leur publication sur le site.
            </p>

            <h2>8. Résiliation</h2>
            <p>
              Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de
              violation de ces conditions.
            </p>

            <h2>9. Contact</h2>
            <p>
              Pour toute question concernant ces conditions, veuillez nous contacter à :
              <a href="mailto:legal@occasi.ch" className="text-red-600 hover:text-red-700">
                legal@occasi.ch
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}