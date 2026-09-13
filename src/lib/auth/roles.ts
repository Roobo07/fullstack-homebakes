import { UserRole, type UserRoleType } from '@/types/enums'

export const PERMISSIONS = {
  // Product permissions
  'products.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  'products.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'products.delete': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Order permissions
  'orders.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  'orders.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  'orders.delete': [UserRole.SUPER_ADMIN],
  // Customer permissions
  'customers.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  'customers.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Billing/POS permissions
  'billing.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  'billing.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  // Inventory permissions
  'inventory.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  'inventory.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Financial permissions
  'finance.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'finance.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'expenses.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'expenses.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Report permissions
  'reports.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Settings permissions
  'settings.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'settings.write': [UserRole.SUPER_ADMIN],
  // Marketing permissions
  'marketing.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'marketing.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Delivery permissions
  'delivery.read': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF],
  'delivery.write': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function hasRole(userRole: UserRoleType, requiredRole: UserRoleType): boolean {
  const hierarchy: Record<UserRoleType, number> = {
    super_admin: 4,
    admin: 3,
    staff: 2,
    customer: 1,
  };
  return hierarchy[userRole] >= hierarchy[requiredRole];
}

export function hasPermission(userRole: UserRoleType, permission: Permission): boolean {
  return PERMISSIONS[permission]?.includes(userRole as any) ?? false;
}

export function isAdminOrStaff(role: UserRoleType): boolean {
  return role === 'super_admin' || role === 'admin' || role === 'staff';
}

export function isAdmin(role: UserRoleType): boolean {
  return role === 'super_admin' || role === 'admin';
}
