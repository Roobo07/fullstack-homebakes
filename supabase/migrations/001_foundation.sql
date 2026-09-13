-- 001_foundation.sql

CREATE TABLE IF NOT EXISTS bakery_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bakery_name TEXT NOT NULL DEFAULT 'HomeBakes',
    logo_url TEXT,
    phone TEXT,
    email TEXT,
    whatsapp TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    opening_hours JSONB DEFAULT '{}',
    delivery_radius_km DECIMAL(5,2) DEFAULT 10,
    min_delivery_order DECIMAL(10,2) DEFAULT 200,
    free_delivery_threshold DECIMAL(10,2) DEFAULT 1500,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_name TEXT DEFAULT 'GST',
    tax_enabled BOOLEAN DEFAULT false,
    currency TEXT DEFAULT 'INR',
    currency_symbol TEXT DEFAULT '₹',
    invoice_prefix TEXT DEFAULT 'INV',
    social_links JSONB DEFAULT '{}',
    payment_methods JSONB DEFAULT '["cash","upi","card"]',
    timezone TEXT DEFAULT 'Asia/Kolkata',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    email TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('super_admin','admin','staff','customer')),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger function for updated_at timestamp auto-update
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Create trigger for bakery_settings
CREATE TRIGGER set_bakery_settings_updated_at
BEFORE UPDATE ON bakery_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
