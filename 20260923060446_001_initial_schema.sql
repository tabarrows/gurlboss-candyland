/*
# GurlBoss CandyLand - Initial Database Schema

1. New Tables
- `admins` — Tracks which Supabase Auth users have admin access (user_id FK to auth.users)
- `categories` — Product categories (e.g., Gummy, Sour, Chocolate, International)
- `products` — Candy products including standard items, Pick & Mix sizes, and GBF platter sizes
- `candies` — Individual candy options available for Pick & Mix and GBF selection
- `orders` — Customer orders with delivery info, payment status, order status
- `order_items` — Line items within an order, storing candy selections as JSONB
- `settings` — Single-row store configuration table (Pick & Mix limits, GBF limits, delivery, social links)

2. Helper Functions
- `is_admin()` — Returns true if the current auth user is in the admins table (SECURITY DEFINER, bypasses RLS)

3. Security (RLS)
- `admins`: Only admin users can SELECT
- `categories`, `products`, `candies`, `settings`: Public SELECT (anon + authenticated), admin-only INSERT/UPDATE/DELETE
- `orders`: Public INSERT (customers place orders), admin-only SELECT/UPDATE/DELETE
- `order_items`: Public INSERT (customers place order items), admin-only SELECT/UPDATE/DELETE
- All admin write operations check `is_admin()`
*/

-- Admins table (must exist before is_admin() function)
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Helper function to check admin status
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid());
$$;

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins_select_admin_only" ON admins;
CREATE POLICY "admins_select_admin_only" ON admins
  FOR SELECT TO authenticated USING (is_admin());

DROP POLICY IF EXISTS "admins_insert_admin_only" ON admins;
CREATE POLICY "admins_insert_admin_only" ON admins
  FOR INSERT TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admins_delete_admin_only" ON admins;
CREATE POLICY "admins_delete_admin_only" ON admins
  FOR DELETE TO authenticated USING (is_admin());

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_public_select" ON categories;
CREATE POLICY "categories_public_select" ON categories
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "categories_admin_insert" ON categories;
CREATE POLICY "categories_admin_insert" ON categories
  FOR INSERT TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS "categories_admin_update" ON categories;
CREATE POLICY "categories_admin_update" ON categories
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "categories_admin_delete" ON categories;
CREATE POLICY "categories_admin_delete" ON categories
  FOR DELETE TO authenticated USING (is_admin());

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  gallery jsonb DEFAULT '[]'::jsonb,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price_cents int,
  size_label text,
  product_type text NOT NULL DEFAULT 'standard',
  max_candy_choices int,
  is_featured boolean NOT NULL DEFAULT false,
  is_visible boolean NOT NULL DEFAULT true,
  is_sold_out boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "products_public_select" ON products;
CREATE POLICY "products_public_select" ON products
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "products_admin_insert" ON products;
CREATE POLICY "products_admin_insert" ON products
  FOR INSERT TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS "products_admin_update" ON products;
CREATE POLICY "products_admin_update" ON products
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "products_admin_delete" ON products;
CREATE POLICY "products_admin_delete" ON products
  FOR DELETE TO authenticated USING (is_admin());

-- Candies table
CREATE TABLE IF NOT EXISTS candies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text,
  category text NOT NULL DEFAULT 'General',
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE candies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "candies_public_select" ON candies;
CREATE POLICY "candies_public_select" ON candies
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "candies_admin_insert" ON candies;
CREATE POLICY "candies_admin_insert" ON candies
  FOR INSERT TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS "candies_admin_update" ON candies;
CREATE POLICY "candies_admin_update" ON candies
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "candies_admin_delete" ON candies;
CREATE POLICY "candies_admin_delete" ON candies
  FOR DELETE TO authenticated USING (is_admin());

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text NOT NULL,
  parish text NOT NULL,
  notes text,
  subtotal_cents int NOT NULL,
  delivery_cents int NOT NULL DEFAULT 0,
  total_cents int NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  order_status text NOT NULL DEFAULT 'new',
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_public_insert" ON orders;
CREATE POLICY "orders_public_insert" ON orders
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "orders_admin_select" ON orders;
CREATE POLICY "orders_admin_select" ON orders
  FOR SELECT TO authenticated USING (is_admin());

DROP POLICY IF EXISTS "orders_admin_update" ON orders;
CREATE POLICY "orders_admin_update" ON orders
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "orders_admin_delete" ON orders;
CREATE POLICY "orders_admin_delete" ON orders
  FOR DELETE TO authenticated USING (is_admin());

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_slug text,
  quantity int NOT NULL DEFAULT 1,
  price_cents int NOT NULL,
  candy_selections jsonb DEFAULT '[]'::jsonb,
  size_label text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "order_items_public_insert" ON order_items;
CREATE POLICY "order_items_public_insert" ON order_items
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "order_items_admin_select" ON order_items;
CREATE POLICY "order_items_admin_select" ON order_items
  FOR SELECT TO authenticated USING (is_admin());

DROP POLICY IF EXISTS "order_items_admin_update" ON order_items;
CREATE POLICY "order_items_admin_update" ON order_items
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "order_items_admin_delete" ON order_items;
CREATE POLICY "order_items_admin_delete" ON order_items
  FOR DELETE TO authenticated USING (is_admin());

-- Settings table (single row, id=1)
CREATE TABLE IF NOT EXISTS settings (
  id int PRIMARY KEY DEFAULT 1,
  pickmix_half_lb_choices int NOT NULL DEFAULT 5,
  pickmix_1lb_choices int NOT NULL DEFAULT 10,
  pickmix_2lb_choices int NOT NULL DEFAULT 10,
  pickmix_3lb_choices int NOT NULL DEFAULT 15,
  gbf_1lb_choices int NOT NULL DEFAULT 5,
  gbf_2lb_choices int NOT NULL DEFAULT 6,
  gbf_3lb_choices int NOT NULL DEFAULT 7,
  gbf_party_choices int NOT NULL DEFAULT 10,
  free_delivery_montego_bay boolean NOT NULL DEFAULT true,
  knutsford_shipping_note text,
  promo_text text,
  tiktok_handle text DEFAULT '1GURL_BOSSGCL',
  instagram_handle text DEFAULT 'GURL_BOSSGCL',
  whatsapp_number text DEFAULT '+18762346429',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_public_select" ON settings;
CREATE POLICY "settings_public_select" ON settings
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "settings_admin_insert" ON settings;
CREATE POLICY "settings_admin_insert" ON settings
  FOR INSERT TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS "settings_admin_update" ON settings;
CREATE POLICY "settings_admin_update" ON settings
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_visible ON products(is_visible);
CREATE INDEX IF NOT EXISTS idx_candies_active ON candies(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Insert default settings row
INSERT INTO settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Insert categories
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Gummy & Chewy', 'gummy-chewy', 1),
  ('Sour', 'sour', 2),
  ('Hard Candy & Lollipops', 'hard-candy-lollipops', 3),
  ('Chocolate', 'chocolate', 4),
  ('International', 'international', 5),
  ('Swedish', 'swedish', 6),
  ('Viral Extras', 'viral-extras', 7),
  ('Taffy', 'taffy', 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert all candies
INSERT INTO candies (name, category, sort_order) VALUES
  ('Swedish Fish', 'Swedish', 1),
  ('Sour Patch Kids', 'Sour', 2),
  ('Sour Patch Watermelon', 'Sour', 3),
  ('Skittles', 'Gummy & Chewy', 4),
  ('Starburst', 'Gummy & Chewy', 5),
  ('Jolly Ranchers', 'Hard Candy & Lollipops', 6),
  ('Nerds', 'Gummy & Chewy', 7),
  ('Nerds Gummy Clusters', 'Gummy & Chewy', 8),
  ('Airheads', 'Gummy & Chewy', 9),
  ('Mike and Ike', 'Gummy & Chewy', 10),
  ('Twizzlers', 'Gummy & Chewy', 11),
  ('Red Vines', 'Gummy & Chewy', 12),
  ('Haribo Goldbears', 'Gummy & Chewy', 13),
  ('Haribo Happy Cola', 'Gummy & Chewy', 14),
  ('Haribo Twin Snakes', 'Gummy & Chewy', 15),
  ('Trolli Sour Brite Crawlers', 'Sour', 16),
  ('Life Savers Gummies', 'Gummy & Chewy', 17),
  ('Fruit Roll-Ups', 'Gummy & Chewy', 18),
  ('Fruit by the Foot', 'Gummy & Chewy', 19),
  ('Ring Pop', 'Hard Candy & Lollipops', 20),
  ('Warheads', 'Sour', 21),
  ('Warheads Cubes', 'Sour', 22),
  ('Toxic Waste', 'Sour', 23),
  ('Cry Baby Tears', 'Sour', 24),
  ('Push Pop', 'Hard Candy & Lollipops', 25),
  ('Baby Bottle Pop', 'Hard Candy & Lollipops', 26),
  ('Fun Dip', 'Hard Candy & Lollipops', 27),
  ('Blow Pop', 'Hard Candy & Lollipops', 28),
  ('Dum Dums', 'Hard Candy & Lollipops', 29),
  ('Airheads Xtremes', 'Gummy & Chewy', 30),
  ('Reese''s Peanut Butter Cups', 'Chocolate', 31),
  ('Reese''s Pieces', 'Chocolate', 32),
  ('Hershey''s Kisses', 'Chocolate', 33),
  ('Hershey''s Cookies ''n'' Creme', 'Chocolate', 34),
  ('KitKat', 'Chocolate', 35),
  ('M&M''s', 'Chocolate', 36),
  ('Snickers', 'Chocolate', 37),
  ('Twix', 'Chocolate', 38),
  ('Milky Way', 'Chocolate', 39),
  ('3 Musketeers', 'Chocolate', 40),
  ('Hi-Chew', 'International', 41),
  ('Pocky', 'International', 42),
  ('Kasugai Gummies', 'International', 43),
  ('Ramune Candy', 'International', 44),
  ('Japanese KitKat varieties', 'International', 45),
  ('Korean gummy/candy varieties', 'International', 46),
  ('Mexican tamarind candy', 'International', 47),
  ('Lucas Candy', 'International', 48),
  ('Pulparindo', 'International', 49),
  ('Chamoy-covered candy', 'International', 50),
  ('BUBS', 'Swedish', 51),
  ('S-Märke Swedish candy', 'Swedish', 52),
  ('Salt Water Taffy', 'Taffy', 53)
ON CONFLICT DO NOTHING;

-- Insert Pick & Mix products
INSERT INTO products (name, slug, description, product_type, size_label, max_candy_choices, sort_order, is_visible) VALUES
  ('Pick & Mix — 1/2 LB', 'pickmix-half-lb', 'Build your own custom candy mix! Choose up to 5 of your favorite candies in a half-pound bag.', 'pickmix', '1/2 LB', 5, 1, true),
  ('Pick & Mix — 1 LB', 'pickmix-1-lb', 'Build your own custom candy mix! Choose up to 10 of your favorite candies in a one-pound bag.', 'pickmix', '1 LB', 10, 2, true),
  ('Pick & Mix — 2 LB', 'pickmix-2-lb', 'Build your own custom candy mix! Choose up to 10 of your favorite candies in a two-pound bag.', 'pickmix', '2 LB', 10, 3, true),
  ('Pick & Mix — 3 LB', 'pickmix-3-lb', 'Build your own custom candy mix! Choose up to 15 of your favorite candies in a three-pound bag.', 'pickmix', '3 LB', 15, 4, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert GBF (GurlBoss Fave) products
INSERT INTO products (name, slug, description, product_type, size_label, max_candy_choices, sort_order, is_featured, is_visible) VALUES
  ('GurlBoss Fave — 1 LB Platter', 'gbf-1-lb', 'The signature GurlBoss Fave candy platter — a real tray loaded with up to 5 of your favorite loose candies, beautifully arranged. Perfect for personal treats or small gifts.', 'gbf', '1 LB', 5, 1, true, true),
  ('GurlBoss Fave — 2 LB Platter', 'gbf-2-lb', 'The signature GurlBoss Fave candy platter — a real tray loaded with up to 6 of your favorite loose candies, beautifully arranged. Great for sharing.', 'gbf', '2 LB', 6, 2, true, true),
  ('GurlBoss Fave — 3 LB Platter', 'gbf-3-lb', 'The signature GurlBoss Fave candy platter — a real tray loaded with up to 7 of your favorite loose candies, beautifully arranged. Perfect for parties.', 'gbf', '3 LB', 7, 3, true, true),
  ('GurlBoss Fave — Party Platter', 'gbf-party', 'The ultimate GurlBoss Fave candy platter — a large real tray loaded with your choice of loose candies, beautifully arranged. Perfect for celebrations and events.', 'gbf', 'Party Platter', 10, 4, true, true)
ON CONFLICT (slug) DO NOTHING;