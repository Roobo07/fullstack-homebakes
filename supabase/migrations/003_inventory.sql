-- 003_inventory.sql

CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    current_stock INT DEFAULT 0,
    reserved_stock INT DEFAULT 0,
    low_stock_threshold INT DEFAULT 5,
    last_restocked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(product_id, variant_id)
);

CREATE TRIGGER set_inventory_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS inventory_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID REFERENCES inventory(id),
    product_id UUID,
    variant_id UUID,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('sale','restock','adjustment','return','damage','production','reservation','release')),
    quantity INT NOT NULL,
    previous_stock INT,
    new_stock INT,
    reference_type TEXT, -- (e.g. 'order','pos_bill','manual')
    reference_id UUID,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);
