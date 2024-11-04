import { useState } from 'react';
import { Database, Download, Upload, RefreshCw, AlertTriangle, Server, HardDrive, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../../utils/cn';

interface BackupInfo {
  id: string;
  date: Date;
  size: string;
  type: 'auto' | 'manual';
  status: 'completed' | 'failed';
}

export default function AdminDatabase() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
  const [backups] = useState<BackupInfo[]>([
    {
      id: '1',
      date: new Date(),
      size: '2.5 GB',
      type: 'auto',
      status: 'completed'
    },
    {
      id: '2',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      size: '2.4 GB',
      type: 'manual',
      status: 'completed'
    },
    {
      id: '3',
      date: new Date(Date.now() - 48 * 60 * 60 * 1000),
      size: '2.3 GB',
      type: 'auto',
      status: 'completed'
    }
  ]);

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Sauvegarde créée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestore = async (backupId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir restaurer cette sauvegarde ? Cette action est irréversible.')) {
      return;
    }

    setIsRestoring(true);
    setSelectedBackup(backupId);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('Base de données restaurée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la restauration');
    } finally {
      setIsRestoring(false);
      setSelectedBackup(null);
    }
  };

  const handleDownload = async (backupId: string) => {
    try {
      toast.success('Téléchargement démarré');
      // Simuler le téléchargement
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Base de données</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les sauvegardes et la maintenance de la base de données
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* État de la base de données */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">État actuel</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Server className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Statut</p>
                <p className="text-lg font-semibold text-gray-900">En ligne</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <HardDrive className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Taille</p>
                <p className="text-lg font-semibold text-gray-900">2.5 GB</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Dernière sauvegarde</p>
                <p className="text-sm font-semibold text-gray-900">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Version</p>
                <p className="text-sm font-semibold text-gray-900">PostgreSQL 14.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Actions</h2>
          <div className="space-y-4">
            <button
              onClick={handleBackup}
              disabled={isBackingUp}
              className={cn(
                "w-full flex items-center justify-center px-4 py-2 rounded-lg",
                "text-white bg-red-600 hover:bg-red-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isBackingUp ? (
                <RefreshCw className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <Download className="h-5 w-5 mr-2" />
              )}
              {isBackingUp ? 'Sauvegarde en cours...' : 'Créer une sauvegarde'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">ou</span>
              </div>
            </div>

            <div className="relative">
              <input
                type="file"
                className="hidden"
                accept=".sql,.dump"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    toast.error('Fonctionnalité non implémentée');
                  }
                }}
                id="backup-upload"
              />
              <label
                htmlFor="backup-upload"
                className={cn(
                  "w-full flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer",
                  "text-gray-700 bg-gray-100 hover:bg-gray-200",
                  "border-2 border-dashed border-gray-300"
                )}
              >
                <Upload className="h-5 w-5 mr-2" />
                Importer une sauvegarde
              </label>
            </div>
          </div>
        </div>

        {/* Liste des sauvegardes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Sauvegardes récentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taille
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backups.map((backup) => (
                    <tr key={backup.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {backup.date.toLocaleString('fr-CH')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {backup.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "px-2 py-1 text-xs font-medium rounded-full",
                          backup.type === 'auto' 
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        )}>
                          {backup.type === 'auto' ? 'Automatique' : 'Manuel'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "px-2 py-1 text-xs font-medium rounded-full",
                          backup.status === 'completed'
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}>
                          {backup.status === 'completed' ? 'Terminé' : 'Échoué'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleDownload(backup.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Télécharger
                          </button>
                          <button
                            onClick={() => handleRestore(backup.id)}
                            disabled={isRestoring}
                            className={cn(
                              "text-red-600 hover:text-red-700",
                              "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                          >
                            {isRestoring && selectedBackup === backup.id ? (
                              <span className="flex items-center">
                                <RefreshCw className="animate-spin h-4 w-4 mr-1" />
                                Restauration...
                              </span>
                            ) : (
                              'Restaurer'
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Maintenance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Optimisation</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Optimisez la base de données pour améliorer les performances
                </p>
                <button
                  onClick={() => toast.error('Fonctionnalité non implémentée')}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Optimiser
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Vérification</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Vérifiez l'intégrité de la base de données
                </p>
                <button
                  onClick={() => toast.error('Fonctionnalité non implémentée')}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Vérifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}