import { useState } from 'react';
import { CreditCard, Edit2, Trash2, Plus } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../../../constants/subscriptions';
import { toast } from 'react-hot-toast';
import { cn } from '../../../utils/cn';

export default function AdminSubscriptions() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleEditPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setShowEditModal(true);
  };

  const handleSavePlan = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Plan mis à jour');
      setShowEditModal(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des abonnements</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les plans d'abonnement et leurs fonctionnalités
        </p>
      </div>

      {/* Actions */}
      <div className="mb-8">
        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau plan
        </button>
      </div>

      {/* Liste des plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(SUBSCRIPTION_PLANS).map(([id, plan]) => (
          <div key={id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditPlan(id)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">
                {plan.price === 0 ? 'Gratuit' : `${plan.price} CHF`}
                <span className="text-sm font-normal text-gray-500">/mois</span>
              </p>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-32">Photos max</span>
                <span className="font-medium">{plan.features.maxPhotos}</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-32">Durée</span>
                <span className="font-medium">{plan.features.durationDays} jours</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-32">Option urgent</span>
                <span className="font-medium">{plan.features.urgent ? 'Oui' : 'Non'}</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-32">Statistiques</span>
                <span className="font-medium">{plan.features.stats ? 'Oui' : 'Non'}</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-32">Mise en avant</span>
                <span className="font-medium">{plan.features.highlighted ? 'Oui' : 'Non'}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedPlan ? 'Modifier le plan' : 'Nouveau plan'}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSavePlan(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom du plan
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prix mensuel (CHF)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}