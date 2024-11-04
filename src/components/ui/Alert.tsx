import { cn } from '@/utils/cn';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  default: {
    container: 'bg-blue-50 text-blue-800 border-blue-200',
    icon: Info,
  },
  success: {
    container: 'bg-green-50 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  warning: {
    container: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    icon: AlertCircle,
  },
  error: {
    container: 'bg-red-50 text-red-800 border-red-200',
    icon: XCircle,
  },
};

export function Alert({ variant = 'default', title, children, className }: AlertProps) {
  const Icon = variants[variant].icon;

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        variants[variant].container,
        className
      )}
    >
      <div className="flex items-start">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}