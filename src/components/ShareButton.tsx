import { useState } from 'react';
import { Share2, Check, Copy, Facebook, Twitter, WhatsApp, Link } from 'lucide-react';
import { cn } from '../utils/cn';

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank'),
    },
    {
      name: 'WhatsApp',
      icon: WhatsApp,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank'),
    },
    {
      name: 'Copier le lien',
      icon: copied ? Check : Copy,
      action: async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-full",
          "hover:bg-gray-100 transition-colors"
        )}
      >
        <Share2 size={20} className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  option.action();
                  if (option.name !== 'Copier le lien') {
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm",
                  "hover:bg-gray-50 transition-colors"
                )}
              >
                <option.icon size={18} />
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}