export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
}

export interface Pagination {
  next: number | null;
  prev: number | null;
  current: number;
  total: number;
  totalPages: number;
}

export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  pagination: Pagination;
}

export type ProductMeasure =
  | 'kg'
  | 'gr'
  | 'litre'
  | 'ml'
  | 'meter'
  | 'cm'
  | 'mm'
  | 'piece'
  | 'packet'
  | 'box';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod = 'CASH' | 'CARD';

export type UserRole = 'ADMIN' | 'COMMERCE';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface UserProfile {
  id: number;
  full_name: string;
  phone: string;
  address: string | null;
  img_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  img_url: string;
  description: string;
  created_at: string;
}

export interface Campaign {
  id: number;
  title: string;
  description: string | null;
  img_url: string | null;
  created_at: string;
}

export interface Product {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: ProductMeasure;
  created_at: string;
  category: { id: number; name: string };
}

export interface ProductDetail extends Product {
  is_favorite: boolean;
}

export interface BasketItem {
  id: number;
  quantity: number;
  total_price: string;
  product: Product;
}

export interface Basket {
  items: BasketItem[];
  total: string;
  count: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  total_price: string;
  product: Product;
}

export interface Order {
  id: number;
  orderNumber: string;
  total: string;
  deliveryFee: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  note: string | null;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
