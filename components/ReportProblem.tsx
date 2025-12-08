import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, Send } from 'lucide-react';
import { Language } from '../types';

interface ReportProblemProps {
  onBack: () => void;
  language: Language;
}

export const ReportProblem: React.FC<ReportProblemProps> = ({ onBack, language }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors group">
        <ArrowRight size={20} className={`transform group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
        <span>{t('العودة للرئيسية', 'Back to Home')}</span>
      </button>

      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('إبلاغ عن مشكلة', 'Report a Problem')}</h2>
        <p className="text-gray-500 max-w-md mx-auto">{t('نأسف لمواجهتك مشكلة. يرجى وصف المشكلة بالتفصيل وسنقوم بحلها في أقرب وقت.', 'We apologize for the inconvenience. Please describe the issue in detail and we will resolve it as soon as possible.')}</p>
      </div>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in zoom-in duration-300">
          <h3 className="text-xl font-bold text-green-800 mb-2">{t('تم استلام البلاغ', 'Report Received')}</h3>
          <p className="text-green-700 mb-6">{t('شكراً لتواصلك معنا. سنقوم بمراجعة المشكلة والرد عليك قريباً.', 'Thank you for contacting us. We will review the issue and get back to you shortly.')}</p>
          <button 
            onClick={onBack}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {t('العودة', 'Return')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('الموضوع', 'Subject')}</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              placeholder={t('مثال: مشكلة في الدفع', 'Ex: Payment Issue')}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('البريد الإلكتروني', 'Email')}</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('تفاصيل المشكلة', 'Problem Details')}</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white resize-none"
              placeholder={t('يرجى كتابة التفاصيل هنا...', 'Please write details here...')}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Send size={18} />
            {t('إرسال البلاغ', 'Submit Report')}
          </button>
        </form>
      )}
    </div>
  );
};