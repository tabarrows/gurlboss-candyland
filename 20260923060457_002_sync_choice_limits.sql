/*
# Update Pick & Mix and GBF max_candy_choices to use settings table values

This migration creates a trigger function that syncs product max_candy_choices
from the settings table whenever settings are updated. This way the admin
can change limits in settings and they automatically apply to products.

1. New Functions
- `sync_product_choice_limits()` — Trigger function that updates product max_candy_choices from settings columns
2. New Triggers
- `settings_sync_choices` — Fires AFTER UPDATE on settings table
*/

CREATE OR REPLACE FUNCTION sync_product_choice_limits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update Pick & Mix products
  UPDATE products SET max_candy_choices = NEW.pickmix_half_lb_choices, updated_at = now()
    WHERE slug = 'pickmix-half-lb';
  UPDATE products SET max_candy_choices = NEW.pickmix_1lb_choices, updated_at = now()
    WHERE slug = 'pickmix-1-lb';
  UPDATE products SET max_candy_choices = NEW.pickmix_2lb_choices, updated_at = now()
    WHERE slug = 'pickmix-2-lb';
  UPDATE products SET max_candy_choices = NEW.pickmix_3lb_choices, updated_at = now()
    WHERE slug = 'pickmix-3-lb';
  -- Update GBF products
  UPDATE products SET max_candy_choices = NEW.gbf_1lb_choices, updated_at = now()
    WHERE slug = 'gbf-1-lb';
  UPDATE products SET max_candy_choices = NEW.gbf_2lb_choices, updated_at = now()
    WHERE slug = 'gbf-2-lb';
  UPDATE products SET max_candy_choices = NEW.gbf_3lb_choices, updated_at = now()
    WHERE slug = 'gbf-3-lb';
  UPDATE products SET max_candy_choices = NEW.gbf_party_choices, updated_at = now()
    WHERE slug = 'gbf-party';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS settings_sync_choices ON settings;
CREATE TRIGGER settings_sync_choices
  AFTER UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION sync_product_choice_limits();