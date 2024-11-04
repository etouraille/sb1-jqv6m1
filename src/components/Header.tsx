import { Search, Bell, User, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import NotificationBadge from './NotificationBadge';
import SearchBar from './SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    setIsMenuOpen(false);
  };

  const handleNotificationsClick = () => {
    navigate('/dashboard/notifications');
    setIsMenuOpen(false);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsMenuOpen(false);
    }
  };

  const handlePostAd = () => {
    if (!user) {
      navigate('/login', { state: { from: '/post-ad' } });
    } else {
      navigate('/post-ad');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <span className="text-2xl font-bold text-red-600">OCCASI</span>
              <span className="text-2xl font-bold text-gray-700">.CH</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Rechercher une annonce..."
              className="w-full"
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/advertising" 
              className="text-gray-700 hover:text-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Publicité
            </Link>
            
            <NotificationBadge 
              count={3}
              onClick={handleNotificationsClick}
            />

            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDashboardClick}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                >
                  <User size={20} />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                >
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                state={{ from: location }}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>Connexion</span>
              </Link>
            )}

            <button
              onClick={handlePostAd}
              className={cn(
                "bg-red-600 text-white px-4 py-2 rounded-lg",
                "hover:bg-red-700 transition-colors"
              )}
            >
              Déposer une annonce
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Rechercher une annonce..."
            />
          </div>
          <nav className="px-4 py-2 space-y-2">
            <Link 
              to="/advertising" 
              className="block px-3 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Publicité
            </Link>
            <Link 
              to="/dashboard/notifications" 
              className="block px-3 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Notifications
            </Link>
            {user ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  Mon Compte
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                state={{ from: location }}
                className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
            <button
              onClick={handlePostAd}
              className="block w-full px-3 py-2 rounded-lg bg-red-600 text-white text-center hover:bg-red-700"
            >
              Déposer une annonce
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}