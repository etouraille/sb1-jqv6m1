import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { cn } from '../utils/cn';

interface ChatModalProps {
  sellerId: string;
  adId: string;
  onClose: () => void;
}

export default function ChatModal({ sellerId, adId, onClose }: ChatModalProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du message
    console.log('Message envoyé:', message);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Message au vendeur</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {/* Messages */}
            <div className="space-y-4">
              {/* Example messages */}
              <div className="flex justify-end">
                <div className="bg-red-600 text-white rounded-lg px-4 py-2 max-w-xs">
                  Bonjour, est-ce que l'article est toujours disponible ?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                  Oui, il est toujours disponible !
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 rounded-lg border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
            <button
              type="submit"
              className={cn(
                "px-4 py-2 rounded-lg",
                "bg-red-600 text-white",
                "hover:bg-red-700 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}