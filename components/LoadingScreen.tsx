import React from 'react';
import { Loader2, Server } from 'lucide-react';

interface LoadingScreenProps {
  language: 'ar' | 'en';
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ language }) => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center animate-pulse">
           <Server size={48} className="text-emerald-600" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
           <Loader2 size={24} className="animate-spin text-emerald-600" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2 font-tajawal">
        {language === 'ar' ? 'بازار لوك' : 'Bazzr lok'}
      </h1>
      
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-500 text-sm animate-pulse">
          {language === 'ar' ? 'جاري الاتصال بالسيرفر...' : 'Connecting to server...'}
        </p>
        <div className="flex gap-1 mt-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};