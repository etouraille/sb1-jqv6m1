import axios, { AxiosError } from 'axios';
import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: UseQueryOptions<T, AxiosError>
) {
  return useQuery<T, AxiosError>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<T>(endpoint);
      return data;
    },
    ...options,
  });
}

export function useApiMutation<T, V>(
  endpoint: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError) => void;
  }
) {
  return useMutation<T, AxiosError, V>({
    mutationFn: async (variables) => {
      const { data } = await api.post<T>(endpoint, variables);
      return data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
      options?.onError?.(error);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
}