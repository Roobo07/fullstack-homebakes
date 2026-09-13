-- 006_custom_orders.sql

CREATE TABLE IF NOT EXISTS custom_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    cake_type TEXT,
    flavor TEXT,
    weight TEXT,
    shape TEXT,
    cream_type TEXT,
    color TEXT,
    toppings TEXT[],
    decoration TEXT,
    theme TEXT,
    cake_message TEXT,
    delivery_date DATE,
    special_instructions TEXT,
    status TEXT CHECK (status IN ('requested','under_review','quoted','customer_approval','approved','preparing','completed','rejected','cancelled')) DEFAULT 'requested',
    estimated_price DECIMAL(10,2),
    final_price DECIMAL(10,2),
    customization_charge DECIMAL(10,2) DEFAULT 0,
    admin_notes TEXT,
    quoted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    converted_order_id UUID REFERENCES orders(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_custom_orders_updated_at
BEFORE UPDATE ON custom_orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS custom_order_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    custom_order_id UUID REFERENCES custom_orders(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_type TEXT CHECK (image_type IN ('reference','result')) DEFAULT 'reference',
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);
