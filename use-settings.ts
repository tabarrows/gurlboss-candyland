import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Settings } from '@/lib/types';

const defaultSettings: Settings = {
  id: 1,
  pickmix_half_lb_choices: 5,
  pickmix_1lb_choices: 10,
  pickmix_2lb_choices: 10,
  pickmix_3lb_choices: 15,
  gbf_1lb_choices: 5,
  gbf_2lb_choices: 6,
  gbf_3lb_choices: 7,
  gbf_party_choices: 10,
  free_delivery_montego_bay: true,
  knutsford_shipping_note: 'Islandwide shipping through Knutsford.',
  promo_text: '',
  tiktok_handle: '1GURL_BOSSGCL',
  instagram_handle: 'GURL_BOSSGCL',
  whatsapp_number: '+18762346429',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('settings').select('*').eq('id', 1).maybeSingle();
      if (data) setSettings(data as Settings);
      setLoading(false);
    })();
  }, []);

  return { settings, loading };
}
