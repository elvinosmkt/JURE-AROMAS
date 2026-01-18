
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

export type OrderStatus = 'Aguardando Pagamento' | 'Preparando' | 'Em Trânsito' | 'Entregue' | 'Cancelado' | 'Pendente';

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zip: string;
  method: string;
  trackingCode?: string;
  cost: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  customerName: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingMethod: string;
  trackingCode?: string;
  shippingAddress: string;
  notes?: string;
  timeline?: { date: string; status: string; completed: boolean }[];
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
  phone: string;
  ordersCount: number;
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
