import { z } from 'zod';

export const adSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  price: z.number().min(0, 'Le prix doit être positif'),
  category: z.string().min(1, 'Veuillez sélectionner une catégorie'),
  location: z.string().min(1, 'Veuillez indiquer une localisation'),
  images: z.array(z.string()).min(1, 'Au moins une image est requise'),
  condition: z.enum(['new', 'like-new', 'good', 'fair', 'poor']),
  deliveryType: z.enum(['pickup', 'shipping', 'both']),
  shippingPrice: z.number().optional(),
});

export const userSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().optional(),
  location: z.string().optional(),
});