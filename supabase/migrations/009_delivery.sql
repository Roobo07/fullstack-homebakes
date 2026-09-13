-- 009_delivery.sql

CREATE TABLE IF NOT EXISTS delivery_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    min_distance_km DECIMAL(5,2) NOT NULL,
    max_distance_km DECIMAL(5,2) NOT NULL,
    delivery_fee DECIMAL(10,2) NOT NULL,
    estimated_time TEXT,
    active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_delivery_zones_updated_at
BEFORE UPDATE ON delivery_zones
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS delivery_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) UNIQUE,
    customer_id UUID REFERENCES customers(id),
    delivery_address JSONB NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    distance_km DECIMAL(5,2),
    delivery_zone_id UUID REFERENCES delivery_zones(id),
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    status TEXT CHECK (status IN ('not_assigned','ready','assigned','out_for_delivery','delivered','failed')) DEFAULT 'not_assigned',
    driver_id UUID REFERENCES auth.users(id),
    driver_notes TEXT,
    estimated_delivery_time TIMESTAMPTZ,
    actual_delivery_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_delivery_orders_updated_at
BEFORE UPDATE ON delivery_orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS delivery_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    delivery_order_id UUID REFERENCES delivery_orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    notes TEXT,
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);
