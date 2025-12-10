import { Product, Order, Report, PopupConfig, SiteConfig, CartItem } from '../types';
import { PRODUCTS } from '../constants';

const DB_KEYS = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  REPORTS: 'reports',
  BANNER: 'bannerText',
  POPUP: 'popupConfig',
  SITE: 'siteConfig',
  CART: 'cart'
};

const LATENCY = 1000; // Reduced latency for better UX on mobile

export const mockServer = {
  // Simulate initial connection
  connect: async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), LATENCY);
    });
  },

  // Generic fetch wrapper with Error Handling
  fetchAllData: async () => {
    try {
      const getSafeJSON = (key: string, defaultValue: any) => {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        try {
          return JSON.parse(item);
        } catch {
          return defaultValue;
        }
      };

      const products = getSafeJSON(DB_KEYS.PRODUCTS, PRODUCTS);
      // Determine if products is empty array (maybe user deleted all), if so, keep it empty. 
      // If it's null/undefined logic handled above.
      
      const orders = getSafeJSON(DB_KEYS.ORDERS, []);
      const reports = getSafeJSON(DB_KEYS.REPORTS, []);
      const cart = getSafeJSON(DB_KEYS.CART, []);
      
      const bannerText = localStorage.getItem(DB_KEYS.BANNER) || 'أهلاً بكم في بازار لوك - خصومات تصل إلى 50% على التشكيلة الجديدة! 🌟 شحن مجاني للطلبات فوق 300 د.م';
      
      const popupConfig = getSafeJSON(DB_KEYS.POPUP, { isActive: false, image: '' });
      const siteConfig = getSafeJSON(DB_KEYS.SITE, { enableTrackOrder: true });

      return {
        products,
        orders,
        reports,
        cart,
        bannerText,
        popupConfig,
        siteConfig
      };
    } catch (error) {
      console.error("Mock Server Error:", error);
      // Fallback to defaults in worst case
      return {
        products: PRODUCTS,
        orders: [],
        reports: [],
        cart: [],
        bannerText: '',
        popupConfig: { isActive: false, image: '' },
        siteConfig: { enableTrackOrder: true }
      };
    }
  },

  // Simulated Database Operations
  saveProducts: (products: Product[]) => localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products)),
  saveOrders: (orders: Order[]) => localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders)),
  saveReports: (reports: Report[]) => localStorage.setItem(DB_KEYS.REPORTS, JSON.stringify(reports)),
  saveCart: (cart: CartItem[]) => localStorage.setItem(DB_KEYS.CART, JSON.stringify(cart)),
  saveBanner: (text: string) => localStorage.setItem(DB_KEYS.BANNER, text),
  savePopupConfig: (config: PopupConfig) => localStorage.setItem(DB_KEYS.POPUP, JSON.stringify(config)),
  saveSiteConfig: (config: SiteConfig) => localStorage.setItem(DB_KEYS.SITE, JSON.stringify(config)),
  
  // Utility to clear data
  resetData: () => {
    localStorage.clear();
    window.location.reload();
  }
};