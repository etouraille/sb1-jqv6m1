import { useState } from 'react';
import { Search, MessageSquare, User, Clock } from 'lucide-react';
import { cn } from '../../../utils/cn';

// Sample messages data
const sampleMessages = [
  {
    id: '1',
    adId: 'ad1',
    adTitle: 'iPhone 14 Pro Max',
    sender: {
      id: 'user2',
      name: 'Marie Dupont',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80'
    },
    messages: [
      {
        id: 'm1',
        text: 'Bonjour, est-ce que l\'iPhone est toujours disponible ?',
        timestamp: '2024-03-15T10:30:00.000Z',
        sender: 'user2'
      },
      {
        id: 'm2',
        text: 'Oui, il est toujours disponible !',
        timestamp: '2024-03-15T10:35:00.000Z',
        sender: 'user1'
      }
    ],
    unread: true,
    lastMessageTime: '2024-03-15T10:35:00.000Z'
  },
  {
    id: '2',
    adId: 'ad2',
    adTitle: 'MacBook Pro M2',
    sender: {
      id: 'user3',
      name: 'Pierre Martin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
    },
    messages: [
      {
        id: 'm3',
        text: 'Pouvez-vous faire un meilleur prix ?',
        timestamp: '2024-03-14T15:20:00.000Z',
        sender: 'user3'
      }
    ],
    unread: false,
    lastMessageTime: '2024-03-14T15:20:00.000Z'
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = sampleMessages.filter(
    conv => conv.adTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
           conv.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChat = sampleMessages.find(conv => conv.id === selectedConversation);

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // TODO: Implement message sending
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos conversations avec les acheteurs et vendeurs
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm flex h-[600px]">
        {/* Liste des conversations */}
        <div className="w-1/3 border-r">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(600px-80px)]">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={cn(
                  "w-full p-4 text-left hover:bg-gray-50 transition-colors",
                  selectedConversation === conv.id && "bg-red-50",
                  conv.unread && "bg-blue-50 hover:bg-blue-100"
                )}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={conv.sender.avatar}
                    alt={conv.sender.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conv.sender.name}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatMessageTime(conv.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conv.adTitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Zone de chat */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* En-tête */}
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedChat.sender.avatar}
                  alt={selectedChat.sender.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {selectedChat.sender.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedChat.adTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === 'user1' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      message.sender === 'user1'
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {formatMessageTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium",
                    "bg-red-600 text-white",
                    "hover:bg-red-700",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucune conversation sélectionnée
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Sélectionnez une conversation pour afficher les messages
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}