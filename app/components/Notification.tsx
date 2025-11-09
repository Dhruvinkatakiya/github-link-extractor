import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'error' | 'success' | 'warning';
  onClose: () => void;
  autoHide?: boolean;
}

export default function Notification({ 
  message, 
  type, 
  onClose, 
  autoHide = false 
}: NotificationProps) {
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoHide, onClose]);

  const styles = {
    error: 'bg-red-500 border-red-200 text-red-800',
    success: 'bg-green-500 border-green-200 text-green-800',
    warning: 'bg-yellow-500 border-yellow-200 text-yellow-800'
  }[type];

  return (
    <div className={`fixed top-20 right-4 z-50 max-w-sm rounded-xl border shadow-lg 
                     animate-slide-in ${styles}`}>
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button 
          onClick={onClose}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}