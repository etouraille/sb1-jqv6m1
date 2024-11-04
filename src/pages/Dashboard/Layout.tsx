import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Dashboard/Sidebar';

export default function DashboardLayout() {
  const { user } = useAuth();
  const userRole = user?.role || 'user';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}