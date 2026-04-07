'use client';
import { useToastStore } from '@/store/toastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { message, type, hideToast } = useToastStore();

  if (!message) return null;

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  };

  const Icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]`}>
        {Icons[type]}
        <p className="flex-1 font-medium">{message}</p>
        <button 
          onClick={hideToast}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
