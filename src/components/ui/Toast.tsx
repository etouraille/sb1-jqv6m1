import { Toast as HotToast, toast } from 'react-hot-toast';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export function Toast({ visible, message, type = 'info' }: ToastProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        'max-w-md w-full shadow-lg rounded-lg pointer-events-auto border',
        styles[type],
        visible ? 'animate-enter' : 'animate-leave'
      )}
    >
      <div className="flex p-4">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}

export const showToast = {
  success: (message: string) => toast.custom((t) => (
    <Toast visible={t.visible} message={message} type="success" />
  )),
  error: (message: string) => toast.custom((t) => (
    <Toast visible={t.visible} message={message} type="error" />
  )),
  warning: (message: string) => toast.custom((t) => (
    <Toast visible={t.visible} message={message} type="warning" />
  )),
  info: (message: string) => toast.custom((t) => (
    <Toast visible={t.visible} message={message} type="info" />
  )),
};