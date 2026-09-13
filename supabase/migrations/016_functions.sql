-- 016_functions.sql

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    seq_val INT;
    new_order_number TEXT;
BEGIN
    CREATE SEQUENCE IF NOT EXISTS order_number_seq;
    seq_val := nextval('order_number_seq');
    new_order_number := 'HB' || LPAD(seq_val::text, 4, '0');
    RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    current_year INT;
    seq_val INT;
BEGIN
    current_year := extract(year from current_date);
    
    INSERT INTO invoice_sequences (year, last_number)
    VALUES (current_year, 1)
    ON CONFLICT (year) DO UPDATE
    SET last_number = invoice_sequences.last_number + 1
    RETURNING last_number INTO seq_val;
    
    RETURN 'INV-' || current_year::text || '-' || LPAD(seq_val::text, 5, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_bill_number()
RETURNS TEXT AS $$
DECLARE
    current_year INT;
    seq_val INT;
BEGIN
    current_year := extract(year from current_date);
    
    INSERT INTO bill_sequences (year, last_number)
    VALUES (current_year, 1)
    ON CONFLICT (year) DO UPDATE
    SET last_number = bill_sequences.last_number + 1
    RETURNING last_number INTO seq_val;
    
    RETURN 'BILL-' || current_year::text || '-' || LPAD(seq_val::text, 5, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deduct_inventory(
    p_product_id UUID, 
    p_variant_id UUID, 
    p_quantity INT, 
    p_reference_type TEXT, 
    p_reference_id UUID, 
    p_user_id UUID
)
RETURNS VOID AS $$
DECLARE
    v_inventory_id UUID;
    v_current_stock INT;
BEGIN
    SELECT id, current_stock INTO v_inventory_id, v_current_stock
    FROM inventory
    WHERE product_id = p_product_id AND variant_id = p_variant_id
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Inventory record not found';
    END IF;
    
    IF v_current_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock';
    END IF;
    
    UPDATE inventory
    SET current_stock = current_stock - p_quantity
    WHERE id = v_inventory_id;
    
    INSERT INTO inventory_transactions (
        inventory_id, product_id, variant_id, transaction_type, 
        quantity, previous_stock, new_stock, reference_type, reference_id, created_by
    ) VALUES (
        v_inventory_id, p_product_id, p_variant_id, 'sale', 
        p_quantity, v_current_stock, v_current_stock - p_quantity, p_reference_type, p_reference_id, p_user_id
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION restore_inventory(
    p_product_id UUID, 
    p_variant_id UUID, 
    p_quantity INT, 
    p_reference_type TEXT, 
    p_reference_id UUID, 
    p_user_id UUID
)
RETURNS VOID AS $$
DECLARE
    v_inventory_id UUID;
    v_current_stock INT;
BEGIN
    SELECT id, current_stock INTO v_inventory_id, v_current_stock
    FROM inventory
    WHERE product_id = p_product_id AND variant_id = p_variant_id
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Inventory record not found';
    END IF;
    
    UPDATE inventory
    SET current_stock = current_stock + p_quantity
    WHERE id = v_inventory_id;
    
    INSERT INTO inventory_transactions (
        inventory_id, product_id, variant_id, transaction_type, 
        quantity, previous_stock, new_stock, reference_type, reference_id, created_by
    ) VALUES (
        v_inventory_id, p_product_id, p_variant_id, 'return', 
        p_quantity, v_current_stock, v_current_stock + p_quantity, p_reference_type, p_reference_id, p_user_id
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_customer_stats(p_customer_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE customers
    SET 
        total_orders = (SELECT COUNT(*) FROM orders WHERE customer_id = p_customer_id),
        total_spent = (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE customer_id = p_customer_id),
        average_order_value = (
            SELECT COALESCE(AVG(total_amount), 0) 
            FROM orders 
            WHERE customer_id = p_customer_id
        ),
        last_order_at = (
            SELECT MAX(created_at) 
            FROM orders 
            WHERE customer_id = p_customer_id
        )
    WHERE id = p_customer_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email, 'customer');
    
    INSERT INTO public.customers (user_id, full_name, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The trigger on auth.users requires superuser privileges
-- We'll try to create it, but in Supabase it's typically done in the SQL Editor
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    CREATE OR REPLACE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END
$$;
