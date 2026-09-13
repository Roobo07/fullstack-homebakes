import { OrderTypeType, DeliveryMethodType, PaymentMethodType, ExpenseCategoryType } from './enums';
import { Order, OrderItem, PosBillItem, CustomerAddress } from './database';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  available?: boolean;
  featured?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateOrderRequest {
  customer_id?: string;
  order_type: OrderTypeType;
  delivery_method: DeliveryMethodType;
  payment_method: PaymentMethodType;
  items: {
    product_id: string;
    variant_id?: string;
    quantity: number;
  }[];
  special_instructions?: string;
  requested_time?: string;
  coupon_code?: string;
  address_id?: string;
  new_address?: Partial<CustomerAddress>;
}

export interface CreateBillRequest {
  cashier_id?: string;
  customer_id?: string;
  payment_method: PaymentMethodType;
  items: {
    product_id: string;
    variant_id?: string;
    quantity: number;
    unit_price: number;
  }[];
  discount: number;
  notes?: string;
}

export interface DeliveryCalculationRequest {
  latitude: number;
  longitude: number;
  orderSubtotal: number;
}

export interface DeliveryCalculationResponse {
  available: boolean;
  distance: number;
  fee: number;
  zone: string;
  estimatedTime?: string;
}

export interface CouponValidationRequest {
  code: string;
  orderSubtotal: number;
  customer_id?: string;
}

export interface CouponValidationResponse {
  valid: boolean;
  discount_amount: number;
  coupon_id?: string;
  message?: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  pendingOrders: number;
  recentSales: { date: string; amount: number }[];
  topProducts: { name: string; sold: number }[];
}

export interface SalesReportData {
  period: string;
  totalSales: number;
  onlineSales: number;
  posSales: number;
  orderCount: number;
  salesByDay: { date: string; amount: number }[];
}

export interface ProfitLossData {
  period: string;
  revenue: number;
  expenses: { category: ExpenseCategoryType; amount: number }[];
  totalExpenses: number;
  netProfit: number;
}
