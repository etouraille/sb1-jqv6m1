import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PricingTable from '../../../components/Dashboard/AdPricing/PricingTable';
import PricingForm from '../../../components/Dashboard/AdPricing/PricingForm';
import { X } from 'lucide-react';

interface PricingFeature {
  name: string;
  value: string | number | boolean;
  type: 'text' | 'number' | 'boolean';
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: PricingFeature[];
  status: 'active' | 'draft';
}

// Données d'exemple
const initialPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Bannière Premium',
    description: 'Bannière publicitaire en haut des pages de recherche',
    price: 299,
    features: [
      { name: 'Position', value: 'Premium', type: 'text' },
      { name: 'Vues estimées', value: 50000, type: 'number' },
      { name: 'Ciblage avancé', value: true, type: 'boolean' }
    ],
    status: 'active'
  },
  {
    id: '2',
    name: 'Encart Latéral',
    description: 'Annonce dans la colonne latérale des pages produits',
    price: 199,
    features: [
      { name: 'Position', value: 'Latérale', type: 'text' },
      { name: 'Vues estimées', value: 30000, type: 'number' },
      { name: 'Ciblage avancé', value: true, type: 'boolean' }
    ],
    status: 'active'
  }
];

export default function AdPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | undefined>();

  const handleAdd = () => {
    setEditingPlan(undefined);
    setShowForm(true);
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleDelete = async (planId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce tarif ?')) {
      try {
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 500));
        setPlans(plans.filter(p => p.id !== planId));
        toast.success('Tarif supprimé avec succès');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleSubmit = async (formData: Omit<PricingPlan, 'id'>) => {
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 500));

      if (editingPlan) {
        setPlans(plans.map(p => 
          p.id === editingPlan.id ? { ...formData, id: editingPlan.id } : p
        ));
        toast.success('Tarif mis à jour avec succès');
      } else {
        const newPlan = {
          ...formData,
          id: Date.now().toString()
        };
        setPlans([...plans, newPlan]);
        toast.success('Nouveau tarif créé avec succès');
      }
      setShowForm(false);
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des tarifs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les tarifs et options des espaces publicitaires
        </p>
      </div>

      <PricingTable
        plans={plans}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal du formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {editingPlan ? 'Modifier le tarif' : 'Nouveau tarif'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <PricingForm
                plan={editingPlan}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}