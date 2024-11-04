import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Heart, Share2, MessageCircle, Shield, Eye, Tag, Package, Truck, Info, Phone } from 'lucide-react';
import { sampleAds } from '../data/sampleData';
import { useAdStore } from '../stores/useAdStore';
import { useAuth } from '../contexts/AuthContext';
import ImageGallery from '../components/ImageGallery';
import ProductDetails from '../components/ProductDetails';
import SimilarAds from '../components/SimilarAds';
import ReportModal from '../components/ReportModal';
import ChatModal from '../components/ChatModal';
import AuthModal from '../components/AuthModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { cn } from '../utils/cn';
import { formatDate } from '../utils/date';
import type { Ad } from '../types';

export default function AdDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [ad, setAd] = useState<Ad | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToFavorites, removeFromFavorites, isFavorite } = useAdStore();
  const [favorite, setFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const phoneNumber = '+41 79 123 45 67';

  useEffect(() => {
    const loadAd = async () => {
      setIsLoading(true);
      try {
        const foundAd = sampleAds.find(a => a.id === id);
        if (foundAd) {
          setAd(foundAd);
          setFavorite(isFavorite(foundAd.id));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadAd();
  }, [id, isFavorite]);

  const handleFavoriteClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!ad) return;
    const newState = !favorite;
    setFavorite(newState);
    if (newState) {
      addToFavorites(ad.id);
    } else {
      removeFromFavorites(ad.id);
    }
  };

  const handleContactClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowContactModal(true);
  };

  const handlePhoneClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowPhone(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Annonce non trouvée</h2>
          <p className="mt-2 text-gray-600">L'annonce que vous recherchez n'existe pas ou a été supprimée.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Galerie d'images */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ImageGallery images={ad.images} />
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{ad.description}</p>
              </div>

              {/* Caractéristiques détaillées */}
              <ProductDetails ad={ad} />

              {/* Informations de livraison */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Livraison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Truck className="w-5 h-5 mr-2" />
                    <span>Mode: {
                      ad.deliveryType === 'pickup' ? 'Retrait sur place' :
                      ad.deliveryType === 'shipping' ? 'Envoi postal' :
                      'Retrait ou envoi'
                    }</span>
                  </div>
                  {ad.shippingPrice && (
                    <div className="flex items-center text-gray-600">
                      <Info className="w-5 h-5 mr-2" />
                      <span>Frais de port: {ad.shippingPrice} CHF</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Annonces similaires */}
              <SimilarAds currentAd={ad} ads={sampleAds} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Main Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{ad.title}</h1>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleFavoriteClick}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        favorite ? "text-red-600 bg-red-50" : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                      )}
                    >
                      <Heart size={24} fill={favorite ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                      <Share2 size={24} />
                    </button>
                    <button 
                      onClick={() => setShowReportModal(true)}
                      className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Shield size={24} />
                    </button>
                  </div>
                </div>

                <p className="text-3xl font-bold text-red-600 mb-6">
                  {ad.price.toLocaleString('fr-CH')} CHF
                </p>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-500">
                    <MapPin size={20} className="mr-2" />
                    <span>{ad.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock size={20} className="mr-2" />
                    <span>Publié {formatDate(ad.createdAt.toString())}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Eye size={20} className="mr-2" />
                    <span>{ad.views} vues</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleContactClick}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contacter le vendeur
                  </button>

                  {/* Bouton Afficher le numéro - Desktop */}
                  <div className="hidden md:block">
                    {user ? (
                      showPhone ? (
                        <a
                          href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          {phoneNumber}
                        </a>
                      ) : (
                        <button
                          onClick={handlePhoneClick}
                          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Afficher le numéro
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => setShowAuthModal(true)}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Voir le numéro
                      </button>
                    )}
                  </div>

                  {/* Bouton Appeler - Mobile */}
                  {user ? (
                    <a
                      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                      className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center md:hidden"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Appeler le vendeur
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center md:hidden"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Voir le numéro
                    </button>
                  )}
                </div>
              </div>

              {/* Safety Tips */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Conseils de sécurité</h3>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• Rencontrez le vendeur dans un lieu public</li>
                  <li>• Vérifiez l'objet avant l'achat</li>
                  <li>• Ne payez pas à l'avance</li>
                  <li>• Méfiez-vous des prix trop bas</li>
                  <li>• Signalez les annonces suspectes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden">
        <div className="flex space-x-3">
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "flex-1 flex items-center justify-center px-4 py-2 rounded-lg",
              favorite 
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-gray-50 text-gray-600 border border-gray-200"
            )}
          >
            <Heart size={20} className="mr-2" fill={favorite ? "currentColor" : "none"} />
            {favorite ? 'Sauvegardé' : 'Sauvegarder'}
          </button>
          <button
            onClick={handleContactClick}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
          >
            <MessageCircle size={20} className="mr-2" />
            Contacter
          </button>
        </div>
      </div>

      {/* Modals */}
      {showContactModal && (
        <ChatModal
          sellerId={ad.userId}
          adId={ad.id}
          onClose={() => setShowContactModal(false)}
        />
      )}

      {showReportModal && (
        <ReportModal
          adId={ad.id}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          message="Connectez-vous pour contacter le vendeur"
        />
      )}
    </>
  );
}