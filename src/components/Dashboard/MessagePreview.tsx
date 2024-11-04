import { useState } from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: Date;
  read: boolean;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Marie Dupont',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80'
    },
    content: 'Bonjour, est-ce que l\'iPhone est toujours disponible ?',
    date: new Date('2024-03-15T10:30:00'),
    read: false
  },
  {
    id: '2',
    sender: {
      name: 'Pierre Martin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
    },
    content: 'Pouvez-vous faire un meilleur prix ?',
    date: new Date('2024-03-14T15:20:00'),
    read: true
  }
];

export default function MessagePreview() {
  const [messages] = useState(sampleMessages);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Messages récents</h3>
        <Link
          to="/dashboard/messages"
          className="flex items-center text-sm text-red-600 hover:text-red-700"
        >
          Voir tous les messages
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start space-x-4 p-4 rounded-lg",
              message.read ? "bg-white" : "bg-red-50"
            )}
          >
            {message.sender.avatar ? (
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-gray-500" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {message.sender.name}
                </p>
                <p className="text-xs text-gray-500">
                  {message.date.toLocaleTimeString('fr-CH', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}