-- 007_payments.sql

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    pos_bill_id UUID,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash','upi','card','online','other')),
    amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending','paid','failed','partially_refunded','refunded')) DEFAULT 'pending',
    transaction_ref TEXT,
    gateway_response JSONB,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
