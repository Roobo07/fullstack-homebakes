-- seed.sql

-- Bakery Settings
INSERT INTO bakery_settings (
    bakery_name, address, city, state, postal_code, latitude, longitude, 
    phone, email, delivery_radius_km, min_delivery_order, free_delivery_threshold,
    currency, currency_symbol, timezone
) VALUES (
    'HomeBakes', '123 Bakery Lane, Anna Nagar', 'Chennai', 'Tamil Nadu', '600040', 13.0827, 80.2707, 
    '+919876543210', 'hello@homebakes.com', 10.00, 200.00, 1500.00,
    'INR', '₹', 'Asia/Kolkata'
) ON CONFLICT DO NOTHING;

-- Categories
INSERT INTO product_categories (id, name, slug, description, sort_order) VALUES
(gen_random_uuid(), 'Cakes', 'cakes', 'Delicious fresh cakes', 1),
(gen_random_uuid(), 'Brownies', 'brownies', 'Fudgy and gooey brownies', 2),
(gen_random_uuid(), 'Cupcakes', 'cupcakes', 'Sweet little treats', 3),
(gen_random_uuid(), 'Cookies', 'cookies', 'Crunchy and chewy cookies', 4),
(gen_random_uuid(), 'Desserts', 'desserts', 'Traditional and modern desserts', 5),
(gen_random_uuid(), 'Pastries', 'pastries', 'Flaky and soft pastries', 6);

-- Products & Variants Data
DO $$
DECLARE
    cat_cakes UUID;
    cat_brownies UUID;
    cat_cupcakes UUID;
    cat_cookies UUID;
    cat_desserts UUID;
    cat_pastries UUID;
    prod_id UUID;
    var_id UUID;
BEGIN
    SELECT id INTO cat_cakes FROM product_categories WHERE slug = 'cakes';
    SELECT id INTO cat_brownies FROM product_categories WHERE slug = 'brownies';
    SELECT id INTO cat_cupcakes FROM product_categories WHERE slug = 'cupcakes';
    SELECT id INTO cat_cookies FROM product_categories WHERE slug = 'cookies';
    SELECT id INTO cat_desserts FROM product_categories WHERE slug = 'desserts';
    SELECT id INTO cat_pastries FROM product_categories WHERE slug = 'pastries';

    -- Chocolate Truffle Cake
    INSERT INTO products (id, category_id, name, slug, sku, base_price, featured, customization_available)
    VALUES (gen_random_uuid(), cat_cakes, 'Chocolate Truffle Cake', 'chocolate-truffle-cake', 'CAKE-TRUF-001', 650.00, true, true)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_variants (id, product_id, name, sku, weight_value, selling_price, cost_price, is_default)
    VALUES 
        (gen_random_uuid(), prod_id, '0.5 KG', 'CAKE-TRUF-001-05', 0.5, 650.00, 300.00, true),
        (gen_random_uuid(), prod_id, '1 KG', 'CAKE-TRUF-001-10', 1.0, 1200.00, 550.00, false),
        (gen_random_uuid(), prod_id, '1.5 KG', 'CAKE-TRUF-001-15', 1.5, 1750.00, 800.00, false),
        (gen_random_uuid(), prod_id, '2 KG', 'CAKE-TRUF-001-20', 2.0, 2300.00, 1100.00, false);

    -- Red Velvet Cake
    INSERT INTO products (id, category_id, name, slug, sku, base_price, featured)
    VALUES (gen_random_uuid(), cat_cakes, 'Red Velvet Cake', 'red-velvet-cake', 'CAKE-RVEL-001', 750.00, true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, weight_value, selling_price, cost_price, is_default)
    VALUES 
        (gen_random_uuid(), prod_id, '0.5 KG', 'CAKE-RVEL-001-05', 0.5, 750.00, 350.00, true),
        (gen_random_uuid(), prod_id, '1 KG', 'CAKE-RVEL-001-10', 1.0, 1400.00, 650.00, false);

    -- Black Forest Cake
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_cakes, 'Black Forest Cake', 'black-forest-cake', 'CAKE-BFOR-001', 600.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, weight_value, selling_price, cost_price, is_default)
    VALUES 
        (gen_random_uuid(), prod_id, '0.5 KG', 'CAKE-BFOR-001-05', 0.5, 600.00, 280.00, true),
        (gen_random_uuid(), prod_id, '1 KG', 'CAKE-BFOR-001-10', 1.0, 1100.00, 520.00, false);

    -- Vanilla Cake
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_cakes, 'Vanilla Cake', 'vanilla-cake', 'CAKE-VAN-001', 500.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, weight_value, selling_price, cost_price, is_default)
    VALUES (gen_random_uuid(), prod_id, '0.5 KG', 'CAKE-VAN-001-05', 0.5, 500.00, 220.00, true);

    -- Butterscotch Cake
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_cakes, 'Butterscotch Cake', 'butterscotch-cake', 'CAKE-BSCOT-001', 550.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, weight_value, selling_price, cost_price, is_default)
    VALUES (gen_random_uuid(), prod_id, '0.5 KG', 'CAKE-BSCOT-001-05', 0.5, 550.00, 250.00, true);

    -- Brownie Box (6 pcs)
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_brownies, 'Brownie Box (6 pcs)', 'brownie-box-6', 'BRWN-BOX-6', 350.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, size, selling_price, cost_price, is_default)
    VALUES (gen_random_uuid(), prod_id, 'Box of 6', 'BRWN-BOX-6-V1', '6 pcs', 350.00, 150.00, true);

    -- Chocolate Cupcake Box (4 pcs)
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_cupcakes, 'Chocolate Cupcake Box (4 pcs)', 'choc-cupcake-box-4', 'CUPC-CHOC-4', 280.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, size, selling_price, cost_price, is_default)
    VALUES (gen_random_uuid(), prod_id, 'Box of 4', 'CUPC-CHOC-4-V1', '4 pcs', 280.00, 120.00, true);

    -- Cookie Box (12 pcs)
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_cookies, 'Cookie Box (12 pcs)', 'cookie-box-12', 'COOK-BOX-12', 320.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, size, selling_price, cost_price, is_default)
    VALUES (gen_random_uuid(), prod_id, 'Box of 12', 'COOK-BOX-12-V1', '12 pcs', 320.00, 140.00, true);

    -- Gulab Jamun Box
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_desserts, 'Gulab Jamun Box', 'gulab-jamun-box', 'DESS-GJ-001', 250.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, size, selling_price, cost_price, is_default)
    VALUES (gen_random_uuid(), prod_id, '500g', 'DESS-GJ-001-500', '500g', 250.00, 110.00, true);

    -- Pineapple Pastry
    INSERT INTO products (id, category_id, name, slug, sku, base_price)
    VALUES (gen_random_uuid(), cat_pastries, 'Pineapple Pastry', 'pineapple-pastry', 'PAST-PINE-001', 80.00)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (id, product_id, name, sku, size, selling_price, cost_price, is_default)
    VALUES (gen_random_uuid(), prod_id, '1 pc', 'PAST-PINE-001-1', '1 pc', 80.00, 35.00, true);
    
    -- Insert inventory for all variants
    INSERT INTO inventory (product_id, variant_id, current_stock, low_stock_threshold)
    SELECT p.id, pv.id, 50, 10
    FROM products p
    JOIN product_variants pv ON p.id = pv.product_id;
END $$;

-- Delivery Zones
INSERT INTO delivery_zones (name, min_distance_km, max_distance_km, delivery_fee) VALUES
('Zone A', 0.00, 3.00, 30.00),
('Zone B', 3.01, 5.00, 50.00),
('Zone C', 5.01, 8.00, 80.00),
('Zone D', 8.01, 10.00, 120.00);

-- Announcements
INSERT INTO announcements (message, type, priority) VALUES
('🎂 Pre-order customized birthday cakes at least 2 days in advance!', 'info', 1);

-- Coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_discount_amount) VALUES
('WELCOME10', 'Welcome Discount', 'percentage', 10.00, 0.00, 200.00),
('BIRTHDAY200', 'Birthday Special', 'fixed', 200.00, 800.00, NULL);
