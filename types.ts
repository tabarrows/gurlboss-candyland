export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  gallery: string[];
  category_id: string | null;
  price_cents: number | null;
  size_label: string | null;
  product_type: 'standard' | 'pickmix' | 'gbf';
  max_candy_choices: number | null;
  is_featured: boolean;
  is_visible: boolean;
  is_sold_out: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface Candy {
  id: string;
  name: string;
  image_url: string | null;
  category: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Settings {
  id: number;
  pickmix_half_lb_choices: number;
  pickmix_1lb_choices: number;
  pickmix_2lb_choices: number;
  pickmix_3lb_choices: number;
  gbf_1lb_choices: number;
  gbf_2lb_choices: number;
  gbf_3lb_choices: number;
  gbf_party_choices: number;
  free_delivery_montego_bay: boolean;
  knutsford_shipping_note: string | null;
  promo_text: string | null;
  tiktok_handle: string;
  instagram_handle: string;
  whatsapp_number: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  parish: string;
  notes: string | null;
  subtotal_cents: number;
  delivery_cents: number;
  total_cents: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  order_status: 'new' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed' | 'cancelled';
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_slug: string | null;
  quantity: number;
  price_cents: number;
  candy_selections: string[];
  size_label: string | null;
  created_at: string;
}

export interface CartItem {
  key: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  product_type: string;
  price_cents: number;
  quantity: number;
  size_label: string | null;
  image_url: string | null;
  candy_selections: string[];
  max_candy_choices: number | null;
}

export const JAMAICAN_PARISHES = [
  'Kingston',
  'St. Andrew',
  'St. Catherine',
  'Clarendon',
  'Manchester',
  'St. Elizabeth',
  'Westmoreland',
  'Hanover',
  'St. James',
  'Trelawny',
  'St. Ann',
  'St. Mary',
  'Portland',
  'St. Thomas',
] as const;

export const CANDY_IMAGES: Record<string, string> = {
  'Swedish Fish': 'https://images.pexels.com/photos/10923765/pexels-photo-10923765.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Sour Patch Kids': 'https://images.pexels.com/photos/32081993/pexels-photo-32081993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Sour Patch Watermelon': 'https://images.pexels.com/photos/32081993/pexels-photo-32081993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Skittles': 'https://images.pexels.com/photos/10112463/pexels-photo-10112463.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Starburst': 'https://images.pexels.com/photos/2350388/pexels-photo-2350388.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Jolly Ranchers': 'https://images.pexels.com/photos/30399678/pexels-photo-30399678.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Nerds': 'https://images.pexels.com/photos/8669981/pexels-photo-8669981.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Nerds Gummy Clusters': 'https://images.pexels.com/photos/8669981/pexels-photo-8669981.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Airheads': 'https://images.pexels.com/photos/2350388/pexels-photo-2350388.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Mike and Ike': 'https://images.pexels.com/photos/2350388/pexels-photo-2350388.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Twizzlers': 'https://images.pexels.com/photos/5469039/pexels-photo-5469039.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Red Vines': 'https://images.pexels.com/photos/5469039/pexels-photo-5469039.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Haribo Goldbears': 'https://images.pexels.com/photos/14029288/pexels-photo-14029288.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Haribo Happy Cola': 'https://images.pexels.com/photos/36461/cola-bottles-fruit-jelly-gummibarchen.jpg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Haribo Twin Snakes': 'https://images.pexels.com/photos/14029289/pexels-photo-14029289.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Trolli Sour Brite Crawlers': 'https://images.pexels.com/photos/14027300/pexels-photo-14027300.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Life Savers Gummies': 'https://images.pexels.com/photos/15360877/pexels-photo-15360877.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Fruit Roll-Ups': 'https://images.pexels.com/photos/8669981/pexels-photo-8669981.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Fruit by the Foot': 'https://images.pexels.com/photos/8669981/pexels-photo-8669981.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Ring Pop': 'https://images.pexels.com/photos/3127883/pexels-photo-3127883.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Warheads': 'https://images.pexels.com/photos/32081993/pexels-photo-32081993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Warheads Cubes': 'https://images.pexels.com/photos/32081993/pexels-photo-32081993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Toxic Waste': 'https://images.pexels.com/photos/32081993/pexels-photo-32081993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Cry Baby Tears': 'https://images.pexels.com/photos/32081993/pexels-photo-32081993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Push Pop': 'https://images.pexels.com/photos/3127883/pexels-photo-3127883.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Baby Bottle Pop': 'https://images.pexels.com/photos/3127883/pexels-photo-3127883.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Fun Dip': 'https://images.pexels.com/photos/3127883/pexels-photo-3127883.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Blow Pop': 'https://images.pexels.com/photos/3127883/pexels-photo-3127883.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Dum Dums': 'https://images.pexels.com/photos/3127883/pexels-photo-3127883.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Airheads Xtremes': 'https://images.pexels.com/photos/2350388/pexels-photo-2350388.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Reese\'s Peanut Butter Cups': 'https://images.pexels.com/photos/15466368/pexels-photo-15466368.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Reese\'s Pieces': 'https://images.pexels.com/photos/15466368/pexels-photo-15466368.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Hershey\'s Kisses': 'https://images.pexels.com/photos/37857736/pexels-photo-37857736.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Hershey\'s Cookies \'n\' Creme': 'https://images.pexels.com/photos/37857736/pexels-photo-37857736.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'KitKat': 'https://images.pexels.com/photos/235394/pexels-photo-235394.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'M&M\'s': 'https://images.pexels.com/photos/65547/pexels-photo-65547.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Snickers': 'https://images.pexels.com/photos/31443060/pexels-photo-31443060.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Twix': 'https://images.pexels.com/photos/31443060/pexels-photo-31443060.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Milky Way': 'https://images.pexels.com/photos/31443060/pexels-photo-31443060.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  '3 Musketeers': 'https://images.pexels.com/photos/31443060/pexels-photo-31443060.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Hi-Chew': 'https://images.pexels.com/photos/15360877/pexels-photo-15360877.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Pocky': 'https://images.pexels.com/photos/15360877/pexels-photo-15360877.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Kasugai Gummies': 'https://images.pexels.com/photos/15360877/pexels-photo-15360877.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Ramune Candy': 'https://images.pexels.com/photos/30399678/pexels-photo-30399678.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Japanese KitKat varieties': 'https://images.pexels.com/photos/235394/pexels-photo-235394.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Korean gummy/candy varieties': 'https://images.pexels.com/photos/15360877/pexels-photo-15360877.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Mexican tamarind candy': 'https://images.pexels.com/photos/30399678/pexels-photo-30399678.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Lucas Candy': 'https://images.pexels.com/photos/30399678/pexels-photo-30399678.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Pulparindo': 'https://images.pexels.com/photos/30399678/pexels-photo-30399678.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Chamoy-covered candy': 'https://images.pexels.com/photos/30399678/pexels-photo-30399678.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'BUBS': 'https://images.pexels.com/photos/10923765/pexels-photo-10923765.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'S-Märke Swedish candy': 'https://images.pexels.com/photos/10923765/pexels-photo-10923765.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Salt Water Taffy': 'https://images.pexels.com/photos/5478056/pexels-photo-5478056.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
};

export const HERO_IMAGE = 'https://images.pexels.com/photos/5469039/pexels-photo-5469039.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
export const CANDY_STORE_IMAGE = 'https://images.pexels.com/photos/364727/pexels-photo-364727.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
export const PLATTER_IMAGE = 'https://images.pexels.com/photos/39076916/pexels-photo-39076916.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
export const ASSORTED_CANDY_IMAGE = 'https://images.pexels.com/photos/7033662/pexels-photo-7033662.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';
export const COLORFUL_CANDY_IMAGE = 'https://images.pexels.com/photos/8669981/pexels-photo-8669981.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

export const PICKMIX_IMAGE = 'https://images.pexels.com/photos/7033824/pexels-photo-7033824.jpeg?auto=compress&cs=tinysrgb&h=600&w=600';
export const GBF_IMAGE = 'https://images.pexels.com/photos/39076916/pexels-photo-39076916.jpeg?auto=compress&cs=tinysrgb&h=600&w=600';

export function formatPrice(cents: number | null): string {
  if (cents === null || cents === undefined) return 'Price TBA';
  return `J$${(cents / 100).toFixed(0)}`;
}

export function generateOrderNumber(): string {
  const prefix = 'GCL';
  const timestamp = Date.now().toString(36).toUpperCase().slice(-6);
  const random = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `${prefix}-${timestamp}${random}`;
}
