-- 014_rls_policies.sql

-- Helper functions
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_staff()
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'staff')
  );
$$;

-- Enable RLS on all tables
ALTER TABLE bakery_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

ALTER TABLE custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_order_images ENABLE ROW LEVEL SECURITY;

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

ALTER TABLE invoice_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_tracking ENABLE ROW LEVEL SECURITY;

ALTER TABLE pos_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE pos_bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_cash_closings ENABLE ROW LEVEL SECURITY;

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Products, categories, announcements, campaigns: public read for active items, admin all
CREATE POLICY "Public read active products" ON products FOR SELECT USING (active = true);
CREATE POLICY "Admin all products" ON products USING (public.is_admin_or_staff());

CREATE POLICY "Public read active categories" ON product_categories FOR SELECT USING (active = true);
CREATE POLICY "Admin all categories" ON product_categories USING (public.is_admin_or_staff());

CREATE POLICY "Public read product variants" ON product_variants FOR SELECT USING (active = true);
CREATE POLICY "Admin all variants" ON product_variants USING (public.is_admin_or_staff());

CREATE POLICY "Public read product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admin all product images" ON product_images USING (public.is_admin_or_staff());

CREATE POLICY "Public read active announcements" ON announcements FOR SELECT USING (active = true);
CREATE POLICY "Admin all announcements" ON announcements USING (public.is_admin_or_staff());

CREATE POLICY "Public read active campaigns" ON campaigns FOR SELECT USING (active = true);
CREATE POLICY "Admin all campaigns" ON campaigns USING (public.is_admin_or_staff());

-- Customer Data (own data only)
CREATE POLICY "Customers own data" ON customers FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admin customers" ON customers USING (public.is_admin_or_staff());

CREATE POLICY "Customers own addresses" ON customer_addresses USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Admin customer addresses" ON customer_addresses USING (public.is_admin_or_staff());

CREATE POLICY "Customers own orders" ON orders USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Admin orders" ON orders USING (public.is_admin_or_staff());

CREATE POLICY "Customers own order items" ON order_items USING (order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())));
CREATE POLICY "Admin order items" ON order_items USING (public.is_admin_or_staff());

CREATE POLICY "Customers own custom orders" ON custom_orders USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Admin custom orders" ON custom_orders USING (public.is_admin_or_staff());

CREATE POLICY "Customers own favorites" ON favorites USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Admin favorites" ON favorites USING (public.is_admin_or_staff());

CREATE POLICY "Customers own reviews" ON reviews FOR SELECT USING (status = 'approved' OR customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Admin reviews" ON reviews USING (public.is_admin_or_staff());

CREATE POLICY "Customers own notifications" ON notifications USING (user_id = auth.uid());
CREATE POLICY "Admin notifications" ON notifications USING (public.is_admin_or_staff());

CREATE POLICY "Customers own payments" ON payments FOR SELECT USING (order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())));
CREATE POLICY "Admin payments" ON payments USING (public.is_admin_or_staff());

-- Profiles
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Admin manage profiles" ON profiles USING (public.is_admin_or_staff());

-- Audit logs
CREATE POLICY "Admin read audit logs" ON audit_logs FOR SELECT USING (public.is_admin_or_staff());
CREATE POLICY "System insert audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- Bakery Settings
CREATE POLICY "Public read settings" ON bakery_settings FOR SELECT USING (true);
CREATE POLICY "Admin write settings" ON bakery_settings USING (public.is_admin_or_staff());

-- POS and Inventory
CREATE POLICY "Staff read pos bills" ON pos_bills USING (public.is_admin_or_staff());
CREATE POLICY "Staff read pos bill items" ON pos_bill_items USING (public.is_admin_or_staff());

CREATE POLICY "Staff read inventory" ON inventory FOR SELECT USING (public.is_admin_or_staff());
CREATE POLICY "Admin write inventory" ON inventory USING (public.is_admin_or_staff());
