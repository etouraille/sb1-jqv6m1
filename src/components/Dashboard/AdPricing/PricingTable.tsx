import { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
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

interface PricingTableProps {
  plans: PricingPlan[];
  onEdit: (plan: PricingPlan) => void;
  onDelete: (planId: string) => void;
  onAdd: () => void;
}

export default function PricingTable({ plans, onEdit, onDelete, onAdd }: PricingTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Tarifs publicitaires</h3>
          <button
            onClick={onAdd}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau tarif
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Format
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix (CHF)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                  <div className="text-sm text-gray-500">{plan.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{plan.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">par mois</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    plan.status === 'active'
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  )}>
                    {plan.status === 'active' ? 'Actif' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(plan)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(plan.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}