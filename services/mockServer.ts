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

const LATENCY = 1500; // Simulated network delay in ms

export const mockServer = {
  // Simulate initial connection
  connect: async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), LATENCY);
    });
  },

  // Generic fetch wrapper
  fetchAllData: async () => {
    // We don't delay here again if called after connect, but for safety in this demo:
    // Fetching Logic
    const products = JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS) || JSON.stringify(PRODUCTS));
    const orders = JSON.parse(localStorage.getItem(DB_KEYS.ORDERS) || '[]');
    const reports = JSON.parse(localStorage.getItem(DB_KEYS.REPORTS) || '[]');
    const cart = JSON.parse(localStorage.getItem(DB_KEYS.CART) || '[]');
    
    const bannerText = localStorage.getItem(DB_KEYS.BANNER) || 'أهلاً بكم في بازار لوك - خصومات تصل إلى 50% على التشكيلة الجديدة! 🌟 شحن مجاني للطلبات فوق 300 د.م';
    
    const popupConfig = JSON.parse(localStorage.getItem(DB_KEYS.POPUP) || JSON.stringify({ isActive: false, image: '' }));
    const siteConfig = JSON.parse(localStorage.getItem(DB_KEYS.SITE) || JSON.stringify({ enableTrackOrder: true }));

    return {
      products,
      orders,
      reports,
      cart,
      bannerText,
      popupConfig,
      siteConfig
    };
  },

  // Simulated Database Operations
  saveProducts: (products: Product[]) => localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products)),
  saveOrders: (orders: Order[]) => localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders)),
  saveReports: (reports: Report[]) => localStorage.setItem(DB_KEYS.REPORTS, JSON.stringify(reports)),
  saveCart: (cart: CartItem[]) => localStorage.setItem(DB_KEYS.CART, JSON.stringify(cart)),
  saveBanner: (text: string) => localStorage.setItem(DB_KEYS.BANNER, text),
  savePopupConfig: (config: PopupConfig) => localStorage.setItem(DB_KEYS.POPUP, JSON.stringify(config)),
  saveSiteConfig: (config: SiteConfig) => localStorage.setItem(DB_KEYS.SITE, JSON.stringify(config)),
};