import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { LoadingSpinner } from './LoadingSpinner';
import { toast } from 'react-hot-toast';
import { cn } from '../utils/cn';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'twint'>('card');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) {
        toast.error(error.message || 'Une erreur est survenue');
      } else {
        toast.success('Paiement effectué avec succès');
        onSuccess();
      }
    } catch (err) {
      toast.error('Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center",
            paymentMethod === 'card'
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          <span className="mr-2">💳</span>
          Carte
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('twint')}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center",
            paymentMethod === 'twint'
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          <span className="mr-2">📱</span>
          TWINT
        </button>
      </div>

      {paymentMethod === 'card' ? (
        <PaymentElement />
      ) : (
        <div className="text-center">
          <img
            src="/twint-qr.png"
            alt="TWINT QR Code"
            className="mx-auto w-48 h-48 mb-4"
          />
          <p className="text-sm text-gray-600">
            Scannez le QR code avec votre application TWINT
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          disabled={isProcessing}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={cn(
            "px-4 py-2 text-sm font-medium text-white rounded-lg",
            "bg-red-600 hover:bg-red-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center"
          )}
        >
          {isProcessing ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Traitement...
            </>
          ) : (
            `Payer CHF ${amount.toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}