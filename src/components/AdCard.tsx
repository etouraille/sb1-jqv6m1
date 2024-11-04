import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Heart, Eye, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useAdStore } from '../stores/useAdStore';
import { formatDate } from '../utils/date';
import { cn } from '../utils/cn';
import type { Ad } from '../types';

interface AdCardProps {
  ad: Ad;
  view?: 'grid' | 'list';
  onReport?: (adId: string) => void;
}

export default function AdCard({ ad, view = 'grid', onReport }: AdCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver();
  const { addToFavorites, removeFromFavorites, isFavorite } = useAdStore();
  const [favorite, setFavorite] = useState(() => isFavorite(ad.id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !favorite;
    setFavorite(newState);
    if (newState) {
      addToFavorites(ad.id);
    } else {
      removeFromFavorites(ad.id);
    }
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement messaging
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement sharing
  };

  const handleClick = () => {
    navigate(`/ad/${ad.id}`);
  };

  if (!ad.images || ad.images.length === 0) {
    return null;
  }

  if (view === 'list') {
    return (
      <motion.div
        ref={targetRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        onClick={handleClick}
        className={cn(
          "bg-white rounded-lg shadow-sm hover:shadow-md",
          "transition-shadow duration-200 cursor-pointer"
        )}
      >
        <div className="flex">
          <div className="relative w-48 h-48">
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-full object-cover rounded-l-lg"
              loading="lazy"
            />
            {ad.urgent && (
              <span className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                Urgent
              </span>
            )}
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{ad.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{ad.description}</p>
              </div>
              <p className="text-xl font-bold text-red-600">
                {ad.price.toLocaleString('fr-CH')} CHF
              </p>
            </div>
            
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{ad.location}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{formatDate(ad.createdAt.toString())}</span>
              </div>
              <div className="flex items-center">
                <Eye size={16} className="mr-1" />
                <span>{ad.views}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  favorite ? "text-red-600 bg-red-50" : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                )}
              >
                <Heart size={20} fill={favorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleMessageClick}
                className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
              >
                <MessageCircle size={20} />
              </button>
              <button
                onClick={handleShareClick}
                className="p-2 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-50"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={targetRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className={cn(
        "group bg-white rounded-lg shadow-sm hover:shadow-md",
        "transition-all duration-200 cursor-pointer overflow-hidden"
      )}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={ad.images[0]}
          alt={ad.title}
          className={cn(
            "w-full h-full object-cover",
            "transition-transform duration-300",
            isHovered && "scale-105"
          )}
          loading="lazy"
        />
        {ad.urgent && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
            Urgent
          </span>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-colors",
              favorite ? "text-red-600" : "text-gray-600 hover:text-red-600"
            )}
          >
            <Heart size={20} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {ad.title}
        </h3>
        
        <p className="text-xl font-bold text-red-600 mb-3">
          {ad.price.toLocaleString('fr-CH')} CHF
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate">{ad.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{formatDate(ad.createdAt.toString())}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center">
              <Eye size={16} className="mr-1" />
              {ad.views}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}