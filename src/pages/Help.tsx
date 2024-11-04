import { Search, Book, MessageCircle, Shield } from 'lucide-react';

const faqCategories = [
  {
    title: "Acheter sur OCCASI.CH",
    icon: Search,
    questions: [
      "Comment rechercher une annonce ?",
      "Comment contacter un vendeur ?",
      "Comment payer en toute sécurité ?"
    ]
  },
  {
    title: "Vendre sur OCCASI.CH",
    icon: Book,
    questions: [
      "Comment publier une annonce ?",
      "Quels sont les frais de publication ?",
      "Comment promouvoir mon annonce ?"
    ]
  },
  {
    title: "Compte et Sécurité",
    icon: Shield,
    questions: [
      "Comment créer un compte ?",
      "Comment modifier mes informations ?",
      "Comment protéger mon compte ?"
    ]
  }
];

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Centre d'aide</h1>
          <p className="mt-4 text-lg text-gray-600">
            Comment pouvons-nous vous aider aujourd'hui ?
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une réponse..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {faqCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <category.icon className="h-6 w-6 text-red-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
              </div>
              <ul className="space-y-3">
                {category.questions.map((question, qIndex) => (
                  <li key={qIndex}>
                    <a href="#" className="text-gray-600 hover:text-red-600">
                      {question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-red-50 rounded-lg p-8 text-center">
          <MessageCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Vous ne trouvez pas la réponse ?
          </h2>
          <p className="text-gray-600 mb-4">
            Notre équipe de support est là pour vous aider
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
}