export const DEBOUNCE_DELAY = 300;
export const IMAGE_SIZES = {
  thumbnail: 'w=200',
  medium: 'w=400',
  large: 'w=800',
} as const;

export const ROUTES = {
  HOME: '/',
  AD_DETAILS: '/ad/:id',
  POST_AD: '/post-ad',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
} as const;