import { Bell } from 'lucide-react';
import { cn } from '../utils/cn';

interface NotificationBadgeProps {
  count: number;
  onClick?: () => void;
}

export default function NotificationBadge({ count, onClick }: NotificationBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 rounded-full",
        "hover:bg-gray-100 transition-colors"
      )}
      aria-label={`${count} notifications non lues`}
    >
      <Bell size={20} className="text-gray-600" />
      {count > 0 && (
        <span className={cn(
          "absolute -top-1 -right-1",
          "h-5 w-5 flex items-center justify-center",
          "bg-red-600 text-white text-xs font-medium rounded-full"
        )}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}