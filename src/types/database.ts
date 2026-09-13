import {
  OrderStatusType,
  PaymentStatusType,
  PaymentMethodType,
  DeliveryMethodType,
  DeliveryStatusType,
  CustomOrderStatusType,
  UserRoleType,
  OrderTypeType,
  ExpenseCategoryType,
  InventoryTransactionTypeType,
  ReviewStatusType,
  CouponDiscountTypeType,
  RefundTypeType,
  RefundStatusType
} from './enums';

export interface BakerySettings {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  tax_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  role: UserRoleType;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  table_name: string;
  record_id: string;
  old_data?: Record<string, unknown>;
  new_data?: Record<string, unknown>;
  created_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id?: string;
  name: string;
  slug: string;
  description?: string;
  base_price: number;
  is_available: boolean;
  is_featured: boolean;
  is_customizable: boolean;
  calories?: number;
  allergens?: string[];
  ingredients?: string[];
  dietary_info?: string[];
  prep_time_minutes?: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string;
  price_adjustment: number;
  weight_grams?: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface Inventory {
  id: string;
  product_id?: string;
  variant_id?: string;
  quantity_available: number;
  low_stock_threshold: number;
  last_restocked_at?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryTransaction {
  id: string;
  inventory_id: string;
  transaction_type: InventoryTransactionTypeType;
  quantity: number;
  reference_id?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  profile_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  total_orders: number;
  total_spent: number;
  last_order_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerAddress {
  id: string;
  customer_id: string;
  label: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id?: string;
  order_number: string;
  order_type: OrderTypeType;
  status: OrderStatusType;
  payment_status: PaymentStatusType;
  delivery_method: DeliveryMethodType;
  subtotal: number;
  tax: number;
  delivery_fee: number;
  discount_total: number;
  total_amount: number;
  special_instructions?: string;
  requested_time?: string;
  coupon_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  variant_id?: string;
  product_name: string;
  variant_name?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  created_at: string;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: OrderStatusType;
  notes?: string;
  created_by?: string;
  created_at: string;
}

export interface CustomOrder {
  id: string;
  customer_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  event_type?: string;
  event_date: string;
  guest_count?: number;
  theme?: string;
  flavors?: string[];
  budget?: number;
  status: CustomOrderStatusType;
  quoted_price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomOrderImage {
  id: string;
  custom_order_id: string;
  url: string;
  description?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id?: string;
  pos_bill_id?: string;
  custom_order_id?: string;
  amount: number;
  payment_method: PaymentMethodType;
  status: PaymentStatusType;
  transaction_id?: string;
  payment_gateway_response?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface InvoiceSequence {
  id: string;
  prefix: string;
  current_number: number;
  updated_at: string;
}

export interface Invoice {
  id: string;
  order_id?: string;
  invoice_number: string;
  customer_name: string;
  customer_email?: string;
  customer_address?: string;
  issue_date: string;
  due_date?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  delivery_fee: number;
  minimum_order_amount: number;
  polygon_data?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DeliveryOrder {
  id: string;
  order_id: string;
  driver_id?: string;
  zone_id?: string;
  status: DeliveryStatusType;
  delivery_address: string;
  recipient_name: string;
  recipient_phone: string;
  estimated_delivery_time?: string;
  actual_delivery_time?: string;
  delivery_notes?: string;
  proof_of_delivery_url?: string;
  created_at: string;
  updated_at: string;
}

export interface DeliveryTracking {
  id: string;
  delivery_order_id: string;
  latitude: number;
  longitude: number;
  recorded_at: string;
}

export interface BillSequence {
  id: string;
  prefix: string;
  current_number: number;
  updated_at: string;
}

export interface DailyCashClosing {
  id: string;
  date: string;
  opening_balance: number;
  closing_balance: number;
  actual_balance: number;
  discrepancy: number;
  notes?: string;
  closed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface PosBill {
  id: string;
  bill_number: string;
  cashier_id?: string;
  customer_id?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total_amount: number;
  payment_method: PaymentMethodType;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PosBillItem {
  id: string;
  pos_bill_id: string;
  product_id?: string;
  variant_id?: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Expense {
  id: string;
  category: ExpenseCategoryType;
  amount: number;
  date: string;
  description: string;
  receipt_url?: string;
  logged_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Refund {
  id: string;
  order_id?: string;
  pos_bill_id?: string;
  amount: number;
  reason: string;
  status: RefundStatusType;
  refund_type: RefundTypeType;
  processed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Return {
  id: string;
  order_item_id?: string;
  pos_bill_item_id?: string;
  quantity: number;
  reason: string;
  condition: string;
  restocked: boolean;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discount_type: CouponDiscountTypeType;
  discount_value: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  start_date?: string;
  end_date?: string;
  usage_limit?: number;
  times_used: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CouponUsage {
  id: string;
  coupon_id: string;
  order_id?: string;
  customer_id?: string;
  discount_applied: number;
  created_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  banner_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampaignProduct {
  id: string;
  campaign_id: string;
  product_id: string;
  promotional_price?: number;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_id?: string;
  rating: number;
  comment?: string;
  status: ReviewStatusType;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  customer_id: string;
  product_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  is_read: boolean;
  type: string;
  link?: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  customer_id?: string;
  staff_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender_type: string;
  sender_id?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Composite Types
export interface ProductWithDetails extends Product {
  variants?: ProductVariant[];
  images?: ProductImage[];
  category?: ProductCategory;
}

export interface OrderWithDetails extends Order {
  items?: OrderItem[];
  customer?: Customer;
  payment?: Payment;
  delivery_order?: DeliveryOrder;
}

export interface CustomerWithDetails extends Customer {
  addresses?: CustomerAddress[];
  recent_orders?: Order[];
}

export interface InvoiceWithItems extends Invoice {
  items?: InvoiceItem[];
}

export interface PosBillWithItems extends PosBill {
  items?: PosBillItem[];
}
