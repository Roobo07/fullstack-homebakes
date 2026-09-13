export const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;
export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

export const PaymentStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  PARTIALLY_REFUNDED: 'partially_refunded',
  REFUNDED: 'refunded',
} as const;
export type PaymentStatusType = typeof PaymentStatus[keyof typeof PaymentStatus];

export const PaymentMethod = {
  CASH: 'cash',
  UPI: 'upi',
  CARD: 'card',
  ONLINE: 'online',
  OTHER: 'other',
} as const;
export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export const DeliveryMethod = {
  PICKUP: 'pickup',
  DELIVERY: 'delivery',
} as const;
export type DeliveryMethodType = typeof DeliveryMethod[keyof typeof DeliveryMethod];

export const DeliveryStatus = {
  NOT_ASSIGNED: 'not_assigned',
  READY: 'ready',
  ASSIGNED: 'assigned',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
} as const;
export type DeliveryStatusType = typeof DeliveryStatus[keyof typeof DeliveryStatus];

export const CustomOrderStatus = {
  REQUESTED: 'requested',
  UNDER_REVIEW: 'under_review',
  QUOTED: 'quoted',
  CUSTOMER_APPROVAL: 'customer_approval',
  APPROVED: 'approved',
  PREPARING: 'preparing',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;
export type CustomOrderStatusType = typeof CustomOrderStatus[keyof typeof CustomOrderStatus];

export const UserRole = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  STAFF: 'staff',
  CUSTOMER: 'customer',
} as const;
export type UserRoleType = typeof UserRole[keyof typeof UserRole];

export const OrderType = {
  ONLINE: 'online',
  POS: 'pos',
} as const;
export type OrderTypeType = typeof OrderType[keyof typeof OrderType];

export const ExpenseCategory = {
  INGREDIENTS: 'ingredients',
  PACKAGING: 'packaging',
  ELECTRICITY: 'electricity',
  DELIVERY: 'delivery',
  STAFF: 'staff',
  RENT: 'rent',
  EQUIPMENT: 'equipment',
  MARKETING: 'marketing',
  OTHER: 'other',
} as const;
export type ExpenseCategoryType = typeof ExpenseCategory[keyof typeof ExpenseCategory];

export const InventoryTransactionType = {
  SALE: 'sale',
  RESTOCK: 'restock',
  ADJUSTMENT: 'adjustment',
  RETURN: 'return',
  DAMAGE: 'damage',
  PRODUCTION: 'production',
  RESERVATION: 'reservation',
  RELEASE: 'release',
} as const;
export type InventoryTransactionTypeType = typeof InventoryTransactionType[keyof typeof InventoryTransactionType];

export const ReviewStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  HIDDEN: 'hidden',
  FEATURED: 'featured',
} as const;
export type ReviewStatusType = typeof ReviewStatus[keyof typeof ReviewStatus];

export const CouponDiscountType = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
} as const;
export type CouponDiscountTypeType = typeof CouponDiscountType[keyof typeof CouponDiscountType];

export const RefundType = {
  FULL: 'full',
  PARTIAL: 'partial',
  CANCELLATION: 'cancellation',
} as const;
export type RefundTypeType = typeof RefundType[keyof typeof RefundType];

export const RefundStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  PROCESSED: 'processed',
  REJECTED: 'rejected',
} as const;
export type RefundStatusType = typeof RefundStatus[keyof typeof RefundStatus];

// Helper arrays for dropdowns/selects
export const ORDER_STATUS_OPTIONS = Object.values(OrderStatus);
export const PAYMENT_STATUS_OPTIONS = Object.values(PaymentStatus);
export const PAYMENT_METHOD_OPTIONS = Object.values(PaymentMethod);
export const EXPENSE_CATEGORY_OPTIONS = Object.values(ExpenseCategory);
export const USER_ROLE_OPTIONS = Object.values(UserRole);

// Status labels for display
export const ORDER_STATUS_LABELS: Record<OrderStatusType, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
  refunded: 'Refunded',
  failed: 'Failed',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatusType, string> = {
  pending: 'Pending',
  paid: 'Paid',
  failed: 'Failed',
  partially_refunded: 'Partially Refunded',
  refunded: 'Refunded',
};

export const DELIVERY_STATUS_LABELS: Record<DeliveryStatusType, string> = {
  not_assigned: 'Not Assigned',
  ready: 'Ready',
  assigned: 'Assigned',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  failed: 'Failed',
};

export const CUSTOM_ORDER_STATUS_LABELS: Record<CustomOrderStatusType, string> = {
  requested: 'Requested',
  under_review: 'Under Review',
  quoted: 'Quoted',
  customer_approval: 'Awaiting Customer Approval',
  approved: 'Approved',
  preparing: 'Preparing',
  completed: 'Completed',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategoryType, string> = {
  ingredients: 'Ingredients',
  packaging: 'Packaging',
  electricity: 'Electricity',
  delivery: 'Delivery',
  staff: 'Staff',
  rent: 'Rent',
  equipment: 'Equipment',
  marketing: 'Marketing',
  other: 'Other',
};
