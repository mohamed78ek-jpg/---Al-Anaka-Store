export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  description: string;
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  cartId: string; // Unique ID combination of productId + size
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: OrderStatus;
  receiptFile?: string; // Base64 string for the uploaded file
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  CART = 'CART',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  ADMIN = 'ADMIN',
  TRACK_ORDER = 'TRACK_ORDER',
  REPORT_PROBLEM = 'REPORT_PROBLEM'
}

export type Language = 'ar' | 'en';

export interface PopupConfig {
  isActive: boolean;
  image: string; // URL or Base64
}

export interface SiteConfig {
  enableTrackOrder: boolean;
}

export interface Report {
  id: number;
  subject: string;
  email: string;
  message: string;
  date: string;
}