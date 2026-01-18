
export type ScentProfile = 'Floral' | 'Terroso' | 'Fresco' | 'Amadeirado' | 'Cítrico';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  intensity: number;
  stock: number;
  sku: string;
  profile: ScentProfile;
  tags: string[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus = 'Pendente' | 'Preparando' | 'Enviado' | 'Entregue' | 'Cancelado';

export interface Order {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  trackingCode?: string;
  shippingMethod: string;
  shippingAddress: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    zip: string;
    city: string;
    state: string;
  };
  preferences: string[];
  orders: Order[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  lastPurchase: string;
  status: 'Ativo' | 'Inativo';
  tier: 'Standard' | 'VIP Gold' | 'VIP Platinum';
}

export interface Coupon {
  id: string;
  code: string;
  type: 'Percentage' | 'Fixed' | 'FreeShipping';
  value: number;
  usageCount: number;
  usageLimit: number;
  expiryDate: string;
  status: 'Ativo' | 'Expirado' | 'Inativo';
}
