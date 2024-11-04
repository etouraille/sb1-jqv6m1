import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

export function useForm<T extends ZodType<any, ZodTypeDef, any>>(
  schema: T,
  defaultValues?: Partial<T['_output']>
) {
  return useHookForm<T['_output']>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}