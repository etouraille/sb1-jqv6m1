import { AlertTriangle, Flag, MessageSquare } from 'lucide-react';

export default function Report() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Signaler un problème</h1>
          <p className="mt-4 text-lg text-gray-600">
            Aidez-nous à maintenir OCCASI.CH sûr et fiable
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type de problème
              </label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="fraud">Fraude ou arnaque</option>
                <option value="inappropriate">Contenu inapproprié</option>
                <option value="counterfeit">Contrefaçon</option>
                <option value="harassment">Harcèlement</option>
                <option value="technical">Problème technique</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL concernée (optionnel)
              </label>
              <input
                type="url"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="https://occasi.ch/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description détaillée
              </label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Décrivez le problème en détail..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pièces jointes (optionnel)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                    >
                      <span>Télécharger un fichier</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="anonymous"
                  name="anonymous"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="anonymous" className="font-medium text-gray-700">
                  Signalement anonyme
                </label>
                <p className="text-gray-500">
                  Votre identité ne sera pas révélée au propriétaire de l'annonce
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Information importante
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Les faux signalements peuvent entraîner la suspension de votre compte.
                      Assurez-vous que votre signalement est justifié et documenté.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700"
              >
                Envoyer le signalement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}