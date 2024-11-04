import { Briefcase, Users, Rocket, Heart } from 'lucide-react';

const positions = [
  {
    title: "Développeur Full Stack",
    department: "Technique",
    location: "Genève",
    type: "CDI",
  },
  {
    title: "Product Manager",
    department: "Produit",
    location: "Lausanne",
    type: "CDI",
  },
  {
    title: "Customer Success Manager",
    department: "Support",
    location: "Zürich",
    type: "CDI",
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Rejoignez OCCASI.CH</h1>
          <p className="mt-4 text-lg text-gray-600">
            Construisez l'avenir du commerce local avec nous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Users className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Culture d'entreprise</h3>
            <p className="text-gray-600">
              Une équipe dynamique et passionnée, orientée vers l'innovation
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Rocket className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Croissance</h3>
            <p className="text-gray-600">
              Des opportunités d'évolution et de développement personnel
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Avantages</h3>
            <p className="text-gray-600">
              Un package attractif et un environnement de travail flexible
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Postes ouverts</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {positions.map((position, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{position.title}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <a
                    href={`/careers/${position.title.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center justify-center px-4 py-2 border border-red-600 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    Postuler
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}