import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { cn } from '../../../utils/cn';

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

interface PricingFormProps {
  plan?: PricingPlan;
  onSubmit: (plan: Omit<PricingPlan, 'id'>) => void;
  onCancel: () => void;
}

export default function PricingForm({ plan, onSubmit, onCancel }: PricingFormProps) {
  const [formData, setFormData] = useState<Omit<PricingPlan, 'id'>>({
    name: plan?.name || '',
    description: plan?.description || '',
    price: plan?.price || 0,
    features: plan?.features || [],
    status: plan?.status || 'draft'
  });

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { name: '', value: '', type: 'text' }]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, field: keyof PricingFeature, value: any) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom du format
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Caractéristiques
          </label>
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center text-sm text-red-600 hover:text-red-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    value={feature.name}
                    onChange={(e) => updateFeature(index, 'name', e.target.value)}
                    placeholder="Nom"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <select
                    value={feature.type}
                    onChange={(e) => updateFeature(index, 'type', e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="text">Texte</option>
                    <option value="number">Nombre</option>
                    <option value="boolean">Oui/Non</option>
                  </select>
                </div>
                <div>
                  {feature.type === 'boolean' ? (
                    <select
                      value={feature.value.toString()}
                      onChange={(e) => updateFeature(index, 'value', e.target.value === 'true')}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  ) : (
                    <input
                      type={feature.type}
                      value={feature.value}
                      onChange={(e) => updateFeature(index, 'value', e.target.value)}
                      placeholder="Valeur"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                    />
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-gray-400 hover:text-red-600"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'draft' })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
        >
          <option value="draft">Brouillon</option>
          <option value="active">Actif</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          {plan ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
}