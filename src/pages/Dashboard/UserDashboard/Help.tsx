import { useState } from 'react';
import { Search, HelpCircle, MessageCircle, Book } from 'lucide-react';
import { cn } from '../../../utils/cn';

const faqCategories = [
  {
    title: "Annonces",
    icon: Book,
    questions: [
      {
        question: "Comment publier une annonce ?",
        answer: "Pour publier une annonce, cliquez sur le bouton 'Déposer une annonce' en haut de la page. Remplissez ensuite le formulaire avec les détails de votre article, ajoutez des photos et validez."
      },
      {
        question: "Comment modifier mon annonce ?",
        answer: "Rendez-vous dans votre tableau de bord, section 'Mes annonces'. Cliquez sur l'icône de modification à côté de l'annonce concernée pour la modifier."
      }
    ]
  },
  {
    title: "Compte",
    icon: HelpCircle,
    questions: [
      {
        question: "Comment changer mon mot de passe ?",
        answer: "Allez dans 'Paramètres' puis 'Sécurité'. Vous pourrez y modifier votre mot de passe en fournissant votre mot de passe actuel."
      },
      {
        question: "Comment gérer mes notifications ?",
        answer: "Dans 'Paramètres' puis 'Notifications', vous pouvez personnaliser les types de notifications que vous souhaitez recevoir."
      }
    ]
  },
  {
    title: "Messages",
    icon: MessageCircle,
    questions: [
      {
        question: "Comment contacter un vendeur ?",
        answer: "Sur la page d'une annonce, cliquez sur le bouton 'Contacter le vendeur' pour envoyer un message."
      },
      {
        question: "Où voir mes messages ?",
        answer: "Tous vos messages sont accessibles depuis la section 'Messages' de votre tableau de bord."
      }
    ]
  }
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Centre d'aide</h1>
        <p className="mt-1 text-sm text-gray-500">
          Trouvez des réponses à vos questions
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Recherche */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une réponse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Catégories */}
        <div className="space-y-6">
          {faqCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setSelectedCategory(
                  selectedCategory === category.title ? null : category.title
                )}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center">
                  <category.icon className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                </div>
                <svg
                  className={cn(
                    "h-5 w-5 text-gray-500 transform transition-transform",
                    selectedCategory === category.title && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {selectedCategory === category.title && (
                <div className="px-6 pb-4">
                  <div className="space-y-4">
                    {category.questions.map((item, index) => (
                      <div key={index} className="rounded-lg bg-gray-50 p-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.question}
                        </h4>
                        <p className="mt-2 text-sm text-gray-600">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact support */}
        <div className="mt-8 bg-red-50 rounded-lg p-6 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-red-600" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Vous ne trouvez pas la réponse ?
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Notre équipe de support est là pour vous aider
          </p>
          <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            Contacter le support
          </button>
        </div>
      </div>
    </div>
  );
}