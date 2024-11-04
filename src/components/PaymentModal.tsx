import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { X } from 'lucide-react';
import PaymentForm from './PaymentForm';
import { cn } from '../utils/cn';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}

export default function PaymentModal({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Paiement sécurisé</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              CHF {amount.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Choisissez votre mode de paiement
            </p>
          </div>
        </div>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#dc2626',
                },
              },
            }}
          >
            <PaymentForm
              amount={amount}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}