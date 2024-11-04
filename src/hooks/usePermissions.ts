import { useAuth } from '../contexts/AuthContext';

export function usePermissions() {
  const { user, isAdmin } = useAuth();

  return {
    canModerateContent: isAdmin,
    canManageUsers: isAdmin,
    canAccessAdminPanel: isAdmin,
    canEditSettings: !!user,
    canPostAd: !!user,
    canContactSellers: !!user,
    canViewPhoneNumbers: !!user,
    isVerified: user?.verified || false,
  };
}