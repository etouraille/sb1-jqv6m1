import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../../components/Dashboard/AdminSidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export default function AdminDashboardLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}