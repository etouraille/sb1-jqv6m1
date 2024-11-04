import { Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ConsentBanner from './components/ConsentBanner';

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ConsentBanner />
      </div>
    </AuthProvider>
  );
}

export default App;