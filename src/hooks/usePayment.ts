import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface PaymentIntent {
  clientSecret: string;
}

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = async (amount: number): Promise<PaymentIntent | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/payments/create-intent', {
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'chf'
      });

      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwintPayment = async (paymentId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/payments/verify-twint', {
        paymentId
      });

      return response.data.success;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPaymentIntent,
    verifyTwintPayment,
    isLoading,
    error
  };
}