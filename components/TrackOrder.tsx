import React, { useState } from 'react';
import { Search, Package, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Order, Language } from '../types';
import { APP_CURRENCY } from '../constants';

interface TrackOrderProps {
  orders: Order[];
  onBack: () => void;
  language: Language;
}

export const TrackOrder: React.FC<TrackOrderProps> = ({ orders, onBack, language }) => {
  const [orderId, setOrderId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id === orderId.trim());
    setFoundOrder(order || null);
    setHasSearched(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors group">
        <ArrowRight size={20} className={`transform group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
        <span>{t('العودة للرئيسية', 'Back to Home')}</span>
      </button>

      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <Search size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('تتبع طلبك', 'Track Your Order')}</h2>
        <p className="text-gray-500">{t('ادخل رقم الطلب لمعرفة حالته الحالية', 'Enter your order ID to check its status')}</p>
      </div>

      <form onSubmit={handleSearch} className="mb-10">
        <div className="flex gap-2">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder={t('مثال: 1234567', 'Ex: 1234567')}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            dir="ltr"
            required
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            {t('بحث', 'Search')}
          </button>
        </div>
      </form>

      {hasSearched && !foundOrder && (
        <div className="text-center p-8 bg-red-50 rounded-xl border border-red-100 text-red-600">
          <p className="font-bold">{t('عذراً، لم يتم العثور على طلب بهذا الرقم.', 'Sorry, no order found with this ID.')}</p>
        </div>
      )}

      {foundOrder && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{t('تفاصيل الطلب', 'Order Details')} #{foundOrder.id}</h3>
              <p className="text-sm text-gray-500">{new Date(foundOrder.date).toLocaleDateString()} {new Date(foundOrder.date).toLocaleTimeString()}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${
              foundOrder.status === 'completed' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {foundOrder.status === 'completed' ? (
                <><CheckCircle size={16} /> {t('مكتمل', 'Completed')}</>
              ) : (
                <><Clock size={16} /> {t('قيد المراجعة', 'Pending')}</>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-bold text-sm text-gray-700 mb-3">{t('المنتجات', 'Items')}</h4>
              <ul className="space-y-2">
                {foundOrder.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name} {item.selectedSize && `(${item.selectedSize})`}
                    </span>
                    <span className="font-bold text-gray-900">{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-gray-900">
                <span>{t('الإجمالي', 'Total')}</span>
                <span className="text-emerald-600">{foundOrder.totalAmount.toFixed(2)} {APP_CURRENCY}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
               <div>
                 <span className="block text-gray-500 mb-1">{t('الاسم', 'Name')}</span>
                 <span className="font-medium text-gray-900">{foundOrder.customerName}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">{t('العنوان', 'Address')}</span>
                 <span className="font-medium text-gray-900">{foundOrder.address}</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};