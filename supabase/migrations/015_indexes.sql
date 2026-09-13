-- 015_indexes.sql

-- products
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active_featured ON products(active, featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- product_variants
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);

-- orders
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_type ON orders(order_type);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- order_items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- inventory
CREATE INDEX IF NOT EXISTS idx_inventory_product_variant ON inventory(product_id, variant_id);

-- payments
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_pos_bill_id ON payments(pos_bill_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- invoices
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_pos_bill_id ON invoices(pos_bill_id);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);

-- customers
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- customer_addresses
CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer_id ON customer_addresses(customer_id);

-- pos_bills
CREATE INDEX IF NOT EXISTS idx_pos_bills_bill_number ON pos_bills(bill_number);
CREATE INDEX IF NOT EXISTS idx_pos_bills_created_at ON pos_bills(created_at);
CREATE INDEX IF NOT EXISTS idx_pos_bills_customer_id ON pos_bills(customer_id);

-- expenses
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);

-- coupons
CREATE INDEX IF NOT EXISTS idx_coupons_code_active ON coupons(code, active);

-- reviews
CREATE INDEX IF NOT EXISTS idx_reviews_product_status ON reviews(product_id, status);

-- notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_read ON notifications(user_id, read);

-- delivery_orders
CREATE INDEX IF NOT EXISTS idx_delivery_orders_order_id ON delivery_orders(order_id);
CREATE INDEX IF NOT EXISTS idx_delivery_orders_status ON delivery_orders(status);

-- audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_id ON audit_logs(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- inventory_transactions
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_inventory_id ON inventory_transactions(inventory_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_reference_id ON inventory_transactions(reference_id);

-- custom_orders
CREATE INDEX IF NOT EXISTS idx_custom_orders_customer_id ON custom_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_custom_orders_status ON custom_orders(status);

-- order_status_history
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);

-- favorites
CREATE INDEX IF NOT EXISTS idx_favorites_customer_id ON favorites(customer_id);
