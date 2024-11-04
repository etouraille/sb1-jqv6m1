import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { User, Settings as SettingsIcon, Bell, Shield, Key } from 'lucide-react';
import Sidebar from '../../../components/Dashboard/Sidebar';
import { cn } from '../../../utils/cn';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'preferences', name: 'Préférences', icon: SettingsIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="user" />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gérez vos préférences et informations personnelles
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm",
                      activeTab === tab.id
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                  >
                    <tab.icon size={18} />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-2 flex items-center space-x-5">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <button type="button" className="text-sm text-red-600 hover:text-red-700">
                        Changer
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      rows={4}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Changer le mot de passe</h3>
                    <form className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Confirmer le mot de passe
                        </label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Mettre à jour
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium text-gray-900">Sessions actives</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Key size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Chrome - Mac OS X</p>
                            <p className="text-sm text-gray-500">Dernière activité il y a 2 heures</p>
                          </div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-700">
                          Déconnecter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Préférences de notification</h3>
                    <div className="mt-4 space-y-4">
                      {[
                        'Nouvelles offres sur mes annonces',
                        'Messages des acheteurs',
                        'Statut de modération',
                        'Newsletters et promotions',
                      ].map((item) => (
                        <div key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          />
                          <label className="ml-3 text-sm text-gray-700">{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Préférences générales</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Langue par défaut
                        </label>
                        <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500">
                          <option>Français</option>
                          <option>Deutsch</option>
                          <option>Italiano</option>
                          <option>English</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fuseau horaire
                        </label>
                        <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500">
                          <option>Europe/Zurich</option>
                          <option>Europe/Paris</option>
                          <option>Europe/London</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}