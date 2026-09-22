import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Gift,
  Heart,
  Instagram,
  Music2,
  Minus,
  MessageCircle,
  PackageOpen,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';
import gclFlyer from '@assets/GCL_WEB_LOGO_1789703659771.png';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  color: string;
  accent: string;
  tag?: string;
  image: string;
};

type CartItem = Product & { quantity: number };

type CatalogCandy = {
  id: string;
  name: string;
  price: number;
  tag?: string;
};

const whatsappOrderNumber = '18762346429';

const catalogGroup = (
  category: string,
  items: CatalogCandy[],
  color: string,
  accent: string,
) => items.map((item) => ({
  ...item,
  category,
  description: `${item.name} from our ${category.toLowerCase()} collection.`,
  color,
  accent,
  image: '',
}));

const products: Product[] = [
  {
    id: 'mango-sour-belts',
    name: 'Mango Sour Belts',
    description: 'Tangy ribbons with a sun-warmed mango finish.',
    price: 6.5,
    category: 'Sour & tangy',
    color: '#f7c842',
    accent: '#ef7659',
    tag: 'Bestseller',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'guava-gummies',
    name: 'Guava Glow Gummies',
    description: 'Soft little jewels, bright with island guava.',
    price: 7.25,
    category: 'Gummies',
    color: '#ec6f69',
    accent: '#f7c842',
    tag: 'New drop',
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'peppermint-rock',
    name: 'Peppermint Rock',
    description: 'A classic striped crunch made for slow savouring.',
    price: 5.75,
    category: 'Hard candy',
    color: '#f2ede0',
    accent: '#16725e',
    image: 'https://images.pexels.com/photos/6167338/pexels-photo-6167338.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'pineapple-chews',
    name: 'Pineapple Chews',
    description: 'Golden, chewy, and gone before the playlist ends.',
    price: 6.75,
    category: 'Chewy',
    color: '#f7c842',
    accent: '#16725e',
    tag: 'Island pick',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cola-bottles',
    name: 'Cola Bottles',
    description: 'Fizzy little throwbacks with a deep cola bite.',
    price: 6.25,
    category: 'Gummies',
    color: '#aa6049',
    accent: '#f7c842',
    image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'berry-clouds',
    name: 'Berry Clouds',
    description: 'Pillowy marshmallow candy dusted in berry sugar.',
    price: 6.95,
    category: 'Soft & sweet',
    color: '#e9a6b1',
    accent: '#ec6f69',
    tag: 'Crowd fave',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  ...catalogGroup('Gummy heaven', [
    { id: 'swedish-fish', name: 'Swedish Fish', price: 7.25, tag: 'Viral fave' },
    { id: 'sour-patch-kids', name: 'Sour Patch Kids', price: 7.5 },
    { id: 'nerds-gummy-clusters', name: 'Nerds Gummy Clusters', price: 8.25, tag: 'New drop' },
    { id: 'gummy-bears-cubes', name: 'Gummy Bears & Cubes', price: 7.25 },
    { id: 'albanese-gummy-bears', name: 'Albanese Gummy Bears', price: 8.5 },
    { id: 'life-savers-gummies', name: 'Life Savers Gummies', price: 7.5 },
    { id: 'haribo-gold-bears', name: 'Haribo Gold Bears', price: 7.25 },
    { id: 'jolly-rancher-gummies', name: 'Jolly Rancher Gummies', price: 7.75 },
    { id: 'trolli-sour-brite-crawlers', name: 'Trolli Sour Brite Crawlers', price: 7.5 },
    { id: 'skittles-gummies', name: 'Skittles Gummies', price: 7.5 },
  ], '#f4b7d8', '#ec168f'),
  ...catalogGroup('Swedish imports', [
    { id: 'watermelon-logs-sour', name: 'Watermelon Logs SOUR', price: 8.25, tag: 'Premium import' },
    { id: 'blue-raspberry-s-marke', name: 'Blue Raspberry S-Märke', price: 8.25 },
    { id: 'orange-cola-bottles', name: 'Orange Cola Bottles', price: 8 },
    { id: 'mini-fruity-sour-skulls', name: 'Mini Fruity Sour Skulls', price: 8.25 },
    { id: 'mini-rainbow-logs-sour', name: 'Mini Rainbow Logs SOUR', price: 8.25 },
    { id: 'strawberry-dreamy', name: 'Strawberry Dreamy', price: 8.25 },
    { id: 'vanilla-cubes', name: 'Vanilla Cubes', price: 8 },
    { id: 'swedish-raspberry-pomegranate', name: 'Swedish Raspberry Pomegranate', price: 8.5 },
    { id: 's-marke-sour', name: 'S-Märke SOUR', price: 8.25 },
    { id: 'blueberry-chunks', name: 'Blueberry Chunks', price: 8 },
    { id: 'sour-melon-chunks', name: 'Sour Melon Chunks', price: 8.25 },
    { id: 'strawberry-crunchy', name: 'Strawberry Crunchy', price: 8.25 },
    { id: 'tutti-frutti-rings', name: 'Tutti Frutti Rings', price: 8 },
    { id: 'fruity-soda-bottles', name: 'Fruity Soda Bottles', price: 8 },
    { id: 'rainbow-pow', name: 'Rainbow Pow', price: 8.25 },
    { id: 'dragon-fruit-peach-sour', name: 'Dragon Fruit Peach SOUR', price: 8.5 },
    { id: 'strawberry-chunks', name: 'Strawberry Chunks', price: 8.25 },
    { id: 'raspberry-belts', name: 'Raspberry Belts', price: 8.25 },
    { id: 'sour-pineapples', name: 'Sour Pineapples', price: 8.25 },
    { id: 'swedish-lips', name: 'Swedish Lips', price: 8 },
    { id: 'cola-bottles-import', name: 'Swedish Cola Bottles', price: 8 },
    { id: 'pastel-swedish-fish-sour', name: 'Pastel Swedish Fish SOUR', price: 8.5, tag: 'Premium import' },
  ], '#f4d6f0', '#8e2a9b'),
  ...catalogGroup('Worldwide imports', [
    { id: 'cadbury-dairy-milk', name: 'UK Cadbury Dairy Milk', price: 8.75, tag: 'UK import' },
    { id: 'maltesers', name: 'UK Maltesers', price: 8.75 },
    { id: 'kitkat-matcha-strawberry', name: 'Japan KitKat Matcha Strawberry', price: 10.5, tag: 'Japan import' },
    { id: 'japan-pocky', name: 'Japan Pocky', price: 8.5 },
    { id: 'lotte-pepero', name: 'Korea Lotte Pepero', price: 8.5 },
    { id: 'honey-butter', name: 'Korea Honey Butter', price: 8.5 },
    { id: 'swedish-fish-worldwide', name: 'Sweden Swedish Fish', price: 8 },
    { id: 'laffy-taffy', name: 'USA Laffy Taffy', price: 7.5 },
    { id: 'usa-taffy', name: 'USA Taffy', price: 7.5 },
    { id: 'jolly-ranchers', name: 'USA Jolly Ranchers', price: 7.75 },
    { id: 'pulparindo', name: 'Mexico Pulparindo', price: 7.5 },
    { id: 'coffee-crisp', name: 'Canada Coffee Crisp', price: 8.75 },
  ], '#c9e8f1', '#166a92'),
  ...catalogGroup('Chocolate & cookie bar', [
    { id: 'pocky-sticks', name: 'Pocky Sticks', price: 8.5 },
    { id: 'hi-chew-mango-grape-strawberry', name: 'Hi-Chew Mango Grape Strawberry', price: 8.25 },
    { id: 'kitkat-japan-lindor', name: 'KitKat Japan & Lindor', price: 10.5, tag: 'Treat bar' },
    { id: 'oreo-flowers', name: 'Oreo Flowers', price: 8.25 },
    { id: 'ferrero-rocher', name: 'Ferrero Rocher', price: 10.5 },
    { id: 'milka-bars', name: 'Milka Bars', price: 9.5 },
    { id: 'kinder-bueno-biscoff', name: 'Kinder Bueno & Biscoff', price: 9.5 },
    { id: 'loacker-wafers', name: 'Loacker Wafers', price: 8.75 },
    { id: 'tim-tam', name: 'Tim Tam', price: 9.5 },
    { id: 'white-chocolate-pretzels', name: 'White Chocolate Pretzels', price: 8.25 },
  ], '#e8c8a7', '#8f3d57'),
];

const mixOptions = [
  { id: 'mango', label: 'Mango sour belts', color: '#f7c842' },
  { id: 'guava', label: 'Guava glow gummies', color: '#ec6f69' },
  { id: 'pineapple', label: 'Pineapple chews', color: '#f1a33a' },
  { id: 'cola', label: 'Cola bottles', color: '#aa6049' },
  { id: 'berry', label: 'Berry clouds', color: '#e9a6b1' },
  { id: 'peppermint', label: 'Peppermint rock', color: '#16725e' },
  { id: 'swedish-fish', label: 'Swedish fish', color: '#f4b7d8' },
  { id: 'sour-patch-kids', label: 'Sour Patch Kids', color: '#ec168f' },
  { id: 'watermelon-logs', label: 'Watermelon logs SOUR', color: '#8e2a9b' },
  { id: 'kitkat-matcha', label: 'KitKat matcha strawberry', color: '#c9e8f1' },
  { id: 'jolly-ranchers', label: 'Jolly Ranchers', color: '#166a92' },
  { id: 'pocky-sticks', label: 'Pocky sticks', color: '#e8c8a7' },
];

const boxSizes = [
  { id: 'mini', name: 'Mini 100g', shortName: 'Mini', weight: '100g', price: 12 },
  { id: 'small', name: 'Small 250g', shortName: 'Small', weight: '250g', price: 18 },
  { id: 'large', name: 'Large 500g', shortName: 'Large', weight: '500g', price: 30 },
] as const;

type BoxSizeId = (typeof boxSizes)[number]['id'];

const currency = (value: number) => `$${value.toFixed(2)}`;

function CandyIllustration({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden ${compact ? 'h-20 w-20 rounded-2xl' : 'h-56 rounded-[1.6rem]'} flex items-center justify-center`}
      style={{ backgroundColor: product.color }}
      data-testid={`visual-product-${product.id}`}
    >
      <div className="absolute -right-8 -top-9 h-32 w-32 rounded-full border-[18px] border-[rgba(255,255,255,.24)]" />
      <div className="absolute -bottom-12 -left-9 h-32 w-32 rounded-full border-[15px] border-[rgba(255,255,255,.26)]" />
      <div className={`${compact ? 'h-11 w-8' : 'h-32 w-24'} relative rotate-6 rounded-[38%] border-2 border-[rgba(23,83,69,.18)] bg-[rgba(255,249,230,.88)] shadow-lg`}>
        <div className="absolute inset-x-2 top-2 bottom-7 rounded-[35%] opacity-90" style={{ background: `repeating-linear-gradient(135deg, ${product.accent} 0 9px, transparent 9px 18px)` }} />
        <div className={`${compact ? 'bottom-1 text-[6px]' : 'bottom-3 text-[10px]'} absolute inset-x-0 text-center font-bold tracking-[.15em] text-[#175345]`}>GURLBOSS</div>
      </div>
      {!compact && <Sparkles className="absolute left-7 top-6 h-7 w-7 text-[#fff9e6]" strokeWidth={1.5} />}
    </div>
  );
}

function GclLogo({ size = 'header' }: { size?: 'header' | 'hero' }) {
  return (
    <span
      className={`gcl-logo gcl-logo--${size}`}
      role="img"
      aria-label="GurlBoss CandyLand GCL official logo"
      style={{ backgroundImage: `url(${gclFlyer})` }}
    />
  );
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All treats');
  const [mix, setMix] = useState<string[]>(['mango', 'guava', 'pineapple']);
  const [mixSize, setMixSize] = useState<BoxSizeId>('small');
  const [customerName, setCustomerName] = useState('');
  const [deliveryDetails, setDeliveryDetails] = useState('');
  const [newsletter, setNewsletter] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = useMemo(
    () => activeCategory === 'All treats' ? products : products.filter((item) => item.category === activeCategory),
    [activeCategory],
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 45 || subtotal === 0 ? 0 : 5.5;
  const total = subtotal + delivery;

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) => current.flatMap((item) => item.id === id
      ? item.quantity + delta <= 0 ? [] : [{ ...item, quantity: item.quantity + delta }]
      : [item]));
  };

  const addMixBox = () => {
    const selectedBox = boxSizes.find((box) => box.id === mixSize) ?? boxSizes[1];
    const selectedPicks = mixOptions
      .filter((option) => mix.includes(option.id))
      .map((option) => option.label)
      .join(', ');
    const boxProduct: Product = {
      id: `mix-box-${mixSize}`,
      name: `Your ${selectedBox.name}`,
      description: `${selectedPicks} packed just for your ${selectedBox.name.toLowerCase()}.`,
      price: selectedBox.price,
      category: 'Build a box',
      color: '#f7c842',
      accent: '#16725e',
      image: '',
    };
    addToCart(boxProduct);
    setCartOpen(true);
  };

  const sendOrderToWhatsApp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const orderLines = cart.map((item) => {
      const boxDetails = item.category === 'Build a box' ? ` (${item.description})` : '';
      return `- ${item.name} x${item.quantity}${boxDetails} — ${currency(item.price * item.quantity)}`;
    });
    const message = [
      'Hi GurlBoss CandyLand! I would like to place an order.',
      '',
      `Customer name: ${customerName.trim()}`,
      `Delivery details: ${deliveryDetails.trim()}`,
      '',
      'Order:',
      ...orderLines,
      '',
      `Subtotal: ${currency(subtotal)}`,
      `Delivery: ${delivery === 0 ? 'FREE' : currency(delivery)}`,
      `Total: ${currency(total)}`,
      '',
      'Please confirm availability and delivery details.',
    ].join('\n');
    window.open(`https://wa.me/${whatsappOrderNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grain min-h-[100dvh] bg-[#fff8e8] text-[#175345]">
      <div className="gcl-topbar">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-5 gap-y-1 px-5 py-2.5 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Free delivery in Montego Bay</span>
            <span className="hidden text-[#ffd2ed]/60 sm:inline">•</span>
            <span>Islandwide shipping via Knutsford</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.tiktok.com/@1GURL_BOSSGCL" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75" aria-label="GurlBoss CandyLand on TikTok">
              <Music2 className="h-3.5 w-3.5" /> 1GURL_BOSSGCL
            </a>
            <a href="https://www.instagram.com/GURL_BOSSGCL" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75" aria-label="GurlBoss CandyLand on Instagram">
              <Instagram className="h-3.5 w-3.5" /> GURL_BOSSGCL
            </a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-[#e8d8b2] bg-[#fff8e8]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo('top')} className="group flex items-center gap-2" data-testid="button-logo">
            <GclLogo />
          </button>
          <nav className="hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[.14em] md:flex" aria-label="Main navigation">
            <button onClick={() => scrollTo('shop')} className="transition-colors hover:text-[#ec6f69]" data-testid="link-shop">Shop sweets</button>
            <button onClick={() => scrollTo('mix')} className="transition-colors hover:text-[#ec6f69]" data-testid="link-build-box">Build a box</button>
            <button onClick={() => scrollTo('delivery')} className="transition-colors hover:text-[#ec6f69]" data-testid="link-delivery">Delivery</button>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="relative flex h-11 items-center gap-2 rounded-full border-2 border-[#175345] bg-[#f7c842] px-4 text-xs font-extrabold uppercase tracking-[.12em] shadow-[3px_3px_0_#175345] transition-transform hover:-translate-y-0.5 active:translate-y-0" data-testid="button-open-cart">
              <ShoppingBag className="h-4 w-4" /> <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ec6f69] px-1 text-[10px] text-[#fff8e8]" data-testid="text-cart-count">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#175345] md:hidden" aria-label="Toggle navigation" data-testid="button-mobile-menu">
              {mobileMenu ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenu && <div className="border-t border-[#e8d8b2] bg-[#fff8e8] px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest"><button onClick={() => scrollTo('shop')} className="text-left" data-testid="mobile-link-shop">Shop sweets</button><button onClick={() => scrollTo('mix')} className="text-left" data-testid="mobile-link-build-box">Build a box</button><button onClick={() => scrollTo('delivery')} className="text-left" data-testid="mobile-link-delivery">Delivery</button></div></div>}
      </header>

      <main id="top">
        <section className="gcl-hero relative overflow-hidden bg-[#f4a08d]" style={{ backgroundImage: `url(${gclFlyer})` }}>
          <div className="gcl-hero-scrim absolute inset-0" aria-hidden="true" />
          <div className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-[#f7c842] opacity-80 blur-3xl" />
          <div className="absolute right-[-5%] top-[-12%] h-96 w-96 rounded-full border-[40px] border-[#ec6f69]/40" />
          <div className="mx-auto grid min-h-[650px] max-w-[1240px] items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
            <div className="gcl-hero-copy relative z-10">
              <GclLogo size="hero" />
              <div className="reveal inline-flex items-center gap-2 rounded-full border-2 border-[#175345] bg-[#fff8e8] px-3 py-2 font-mono-brand text-[10px] font-medium uppercase tracking-[.16em] shadow-[3px_3px_0_#175345]"><span className="h-2 w-2 rounded-full bg-[#ec6f69]" /> Made with island energy</div>
              <h1 className="reveal reveal-delay-1 mt-7 max-w-[620px] font-display text-[clamp(4rem,10vw,8.3rem)] font-bold leading-[.82] tracking-[-.065em] text-[#175345]">Big sweet<br /><span className="text-[#ec168f]">feelings.</span></h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-[455px] text-lg font-medium leading-relaxed text-[#175345]/85">A little candy stop from Jamaica for the girls who like their treats loud, their boxes personal, and their cravings handled.</p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
                <button onClick={() => scrollTo('shop')} className="group flex items-center gap-3 rounded-full border-2 border-[#175345] bg-[#175345] px-6 py-3.5 text-sm font-bold text-[#fff8e8] shadow-[4px_4px_0_#fff8e8] transition-all hover:-translate-y-1" data-testid="button-shop-the-drop">Shop the drop <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                <button onClick={() => scrollTo('mix')} className="flex items-center gap-2 rounded-full border-2 border-[#175345] bg-transparent px-6 py-3.5 text-sm font-bold text-[#175345] transition-colors hover:bg-[#f7c842]" data-testid="button-build-your-box">Build your box</button>
              </div>
              <div className="reveal reveal-delay-4 mt-12 flex items-center gap-6 border-t border-[#175345]/25 pt-5">
                <div><p className="font-display text-2xl font-bold">47.2k</p><p className="font-mono-brand text-[9px] uppercase tracking-widest">happy sweet teeth</p></div>
                <div className="h-8 w-px bg-[#175345]/25" />
                <div><p className="flex items-center gap-1 font-display text-2xl font-bold">4.9 <Star className="h-4 w-4 fill-current" /></p><p className="font-mono-brand text-[9px] uppercase tracking-widest">box joy rating</p></div>
              </div>
            </div>
            <div className="relative flex min-h-[390px] items-center justify-center lg:min-h-[530px]">
              <div className="absolute h-[300px] w-[300px] rounded-full bg-[#f7c842] sm:h-[390px] sm:w-[390px]" />
              <div className="floaty relative z-10 h-[315px] w-[250px] rotate-[-7deg] rounded-[28px] border-[3px] border-[#175345] bg-[#16725e] p-4 shadow-[14px_16px_0_#175345] sm:h-[410px] sm:w-[320px]">
                <div className="flex h-full flex-col items-center justify-between rounded-[20px] border border-[#f7c842]/50 bg-[linear-gradient(145deg,#1a806a,#125846)] px-4 py-8">
                  <div className="flex w-full justify-between font-mono-brand text-[9px] uppercase tracking-[.2em] text-[#f7c842]"><span>Jamaica</span><span>Vol. 01</span></div>
                  <div className="text-center">
                    <p className="font-display text-[4rem] font-bold leading-[.75] tracking-[-.07em] text-[#fff8e8] sm:text-[5rem]">Gurl<br />Boss</p>
                    <p className="mt-5 font-mono-brand text-[10px] uppercase tracking-[.3em] text-[#f7c842]">CandyLand</p>
                  </div>
                  <div className="flex gap-2">
                    {['#f7c842', '#ec6f69', '#f3e7bf', '#ed8c4b', '#e9a6b1'].map((color) => <span key={color} className="h-7 w-7 rounded-full border-2 border-[#fff8e8]/70" style={{ background: color }} />)}
                  </div>
                </div>
              </div>
              <div className="floaty-delay absolute bottom-4 left-[3%] z-20 flex h-20 w-20 rotate-[-14deg] items-center justify-center rounded-[22px] border-2 border-[#175345] bg-[#ec6f69] text-center font-display text-lg font-bold leading-[.9] shadow-[4px_5px_0_#175345] sm:left-[8%]">sour<br />power</div>
              <div className="floaty absolute right-[0%] top-8 z-20 flex h-24 w-24 rotate-[13deg] items-center justify-center rounded-full border-2 border-[#175345] bg-[#fff8e8] text-center font-mono-brand text-[9px] font-bold uppercase tracking-widest shadow-[4px_5px_0_#175345] sm:right-[2%]">packed<br />with joy</div>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y-2 border-[#175345] bg-[#f7c842] py-3">
          <div className="marquee-track flex w-max items-center gap-8 font-display text-xl font-bold"><span>Sweet tooth society</span><span className="text-[#ec6f69]">—</span><span>Island-made energy</span><span className="text-[#ec6f69]">—</span><span>Box it. Send it. Love it.</span><span className="text-[#ec6f69]">—</span><span>Sweet tooth society</span><span className="text-[#ec6f69]">—</span><span>Island-made energy</span><span className="text-[#ec6f69]">—</span><span>Box it. Send it. Love it.</span><span className="text-[#ec6f69]">—</span></div>
        </div>

        <section id="shop" className="gcl-shop-band mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28" style={{ backgroundImage: `linear-gradient(rgba(255,248,232,.88), rgba(255,248,232,.94)), url(${gclFlyer})` }}>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><p className="font-mono-brand text-[10px] font-medium uppercase tracking-[.23em] text-[#ec6f69]">The candy counter</p><h2 className="mt-3 font-display text-5xl font-bold tracking-[-.05em] md:text-7xl">Pick your happy.</h2><p className="mt-4 max-w-md text-[#175345]/70">Gummy heaven, premium Swedish imports, worldwide favorites, and chocolate bars — all gathered in one sweet place.</p></div>
            <button onClick={() => scrollTo('mix')} className="group flex items-center gap-2 text-sm font-bold underline decoration-[#ec6f69] decoration-2 underline-offset-4" data-testid="link-see-all-treats">See all treats <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
          </div>
          <div className="mt-9 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Treat categories">
            {['All treats', 'Gummies', 'Gummy heaven', 'Sour & tangy', 'Chewy', 'Hard candy', 'Soft & sweet', 'Swedish imports', 'Worldwide imports', 'Chocolate & cookie bar'].map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border-2 px-4 py-2.5 text-xs font-bold transition-all ${activeCategory === category ? 'border-[#175345] bg-[#175345] text-[#fff8e8]' : 'border-[#d7c497] bg-transparent hover:border-[#175345]'}`} role="tab" aria-selected={activeCategory === category} data-testid={`tab-category-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => <article key={product.id} className="lift group rounded-[1.6rem] border-2 border-[#ead9b4] bg-[#fffdf5] p-3" data-testid={`card-product-${product.id}`}>
              <div className="relative"><CandyIllustration product={product} />{product.tag && <span className="absolute left-3 top-3 rounded-full bg-[#fff8e8] px-3 py-1.5 font-mono-brand text-[9px] font-bold uppercase tracking-widest text-[#175345]">{product.tag}</span>}<button onClick={() => addToCart(product)} className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#175345] bg-[#f7c842] text-[#175345] opacity-0 shadow-[2px_2px_0_#175345] transition-all hover:scale-105 group-hover:opacity-100 focus:opacity-100" aria-label={`Add ${product.name} to bag`} data-testid={`button-add-${product.id}`}><Plus className="h-5 w-5" /></button></div>
              <div className="px-2 pb-2 pt-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-2xl font-bold">{product.name}</h3><p className="mt-1 text-xs leading-relaxed text-[#175345]/65">{product.description}</p></div><span className="font-mono-brand text-sm font-medium">{currency(product.price)}</span></div><button onClick={() => addToCart(product)} className="mt-5 flex w-full items-center justify-between border-t border-[#ead9b4] pt-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#ec6f69] transition-colors hover:text-[#175345]" data-testid={`button-add-text-${product.id}`}>Add to bag <ArrowRight className="h-4 w-4" /></button></div>
            </article>)}
          </div>
        </section>

        <section id="mix" className="relative overflow-hidden bg-[#16725e] text-[#fff8e8]">
          <div className="absolute -right-20 top-20 h-80 w-80 rounded-full border-[50px] border-[#f7c842]/20" />
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-28">
            <div className="relative z-10"><p className="font-mono-brand text-[10px] uppercase tracking-[.23em] text-[#f7c842]">The main character box</p><h2 className="mt-4 max-w-md font-display text-5xl font-bold leading-[.9] tracking-[-.05em] md:text-7xl">Make it<br /><span className="text-[#f7c842]">your mix.</span></h2><p className="mt-6 max-w-sm leading-relaxed text-[#fff8e8]/75">Choose the mood, we do the neat little packing. Every box gets a hand-tied note and a generous scoop of your best decisions.</p><div className="mt-8 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ec6f69]"><Heart className="h-4 w-4 fill-current" /></span><span className="text-sm font-bold">No boring boxes here.</span></div></div>
            <div className="relative z-10 rounded-[1.7rem] border-2 border-[#f7c842]/60 bg-[#fff8e8] p-5 text-[#175345] shadow-[8px_8px_0_#f7c842] sm:p-7">
              <div className="flex items-start justify-between border-b border-[#ead9b4] pb-5"><div><p className="font-mono-brand text-[9px] uppercase tracking-widest text-[#ec6f69]">Step 01 / 02</p><h3 className="mt-2 font-display text-3xl font-bold">What’s going in?</h3></div><span className="rounded-full bg-[#f7c842] px-3 py-2 font-mono-brand text-xs font-bold">{mix.length} picks</span></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">{mixOptions.map((option) => { const active = mix.includes(option.id); return <button key={option.id} onClick={() => setMix((current) => active ? current.filter((id) => id !== option.id) : [...current, option.id])} className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${active ? 'border-[#175345] bg-[#f7e9bc]' : 'border-[#ead9b4] bg-[#fffdf5] hover:border-[#175345]'}`} aria-pressed={active} data-testid={`toggle-mix-${option.id}`}><span className="h-8 w-8 rounded-lg border border-[#175345]/10" style={{ backgroundColor: option.color }} /><span className="flex-1 text-xs font-bold">{option.label}</span><span className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? 'border-[#175345] bg-[#175345] text-[#fff8e8]' : 'border-[#cdbf9c]'}`}>{active && <Check className="h-3 w-3" />}</span></button>; })}</div>
              <div className="mt-7 flex flex-col justify-between gap-5 border-t border-[#ead9b4] pt-6 sm:flex-row sm:items-end"><div><p className="font-mono-brand text-[9px] uppercase tracking-widest text-[#175345]/55">Choose your box size</p><div className="mt-2 flex flex-wrap rounded-2xl border-2 border-[#175345] p-1">{boxSizes.map((box) => <button key={box.id} onClick={() => setMixSize(box.id)} className={`rounded-xl px-3 py-2 text-xs font-bold ${mixSize === box.id ? 'bg-[#175345] text-[#fff8e8]' : ''}`} data-testid={`button-size-${box.id}`}>{box.shortName} · {box.weight} · {currency(box.price)}</button>)}</div></div><button onClick={addMixBox} disabled={mix.length === 0} className="flex items-center justify-center gap-3 rounded-full border-2 border-[#175345] bg-[#f7c842] px-5 py-3 text-sm font-bold shadow-[3px_3px_0_#175345] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50" data-testid="button-add-mix-box">Add my box <Plus className="h-4 w-4" /></button></div>
            </div>
          </div>
        </section>

        <section id="delivery" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono-brand text-[10px] uppercase tracking-[.23em] text-[#ec6f69]">From our shelf to your door</p><h2 className="mt-4 font-display text-5xl font-bold leading-[.9] tracking-[-.05em] md:text-6xl">Sweetness,<br />on its way.</h2><p className="mt-6 max-w-sm leading-relaxed text-[#175345]/70">We pack every order in Kingston with care, then send the good mood wherever you are.</p></div><div className="grid gap-4 sm:grid-cols-3">{[{ icon: PackageOpen, title: 'Packed with care', text: 'Every order gets a little personal touch.' }, { icon: Truck, title: 'Island-wide', text: 'Delivery across Jamaica, Tuesdays to Saturdays.' }, { icon: Clock3, title: 'Right on time', text: 'Most boxes arrive in 1–3 business days.' }].map(({ icon: Icon, title, text }, index) => <div key={title} className={`rounded-[1.4rem] border-2 border-[#ead9b4] p-5 ${index === 1 ? 'bg-[#f7c842]' : 'bg-[#fffdf5]'}`}><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16725e] text-[#f7c842]"><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-display text-2xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#175345]/65">{text}</p></div>)}</div></div>
          <div className="mt-16 grid gap-4 border-y-2 border-[#175345] py-6 text-center sm:grid-cols-3"><div><p className="font-display text-2xl font-bold">Free delivery</p><p className="mt-1 text-xs text-[#175345]/60">on orders over $45</p></div><div className="border-[#175345]/20 sm:border-x-2"><p className="font-display text-2xl font-bold">Easy gifting</p><p className="mt-1 text-xs text-[#175345]/60">add a note at checkout</p></div><div><p className="font-display text-2xl font-bold">Always fresh</p><p className="mt-1 text-xs text-[#175345]/60">sealed for the journey</p></div></div>
        </section>

        <section className="mx-5 mb-20 overflow-hidden rounded-[2rem] bg-[#ec6f69] lg:mx-auto lg:max-w-[1190px]">
          <div className="grid items-center gap-8 px-6 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:px-20 lg:py-16"><div><p className="font-mono-brand text-[10px] uppercase tracking-[.23em] text-[#fff8e8]">Good news, delivered</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[.92] tracking-[-.04em] text-[#fff8e8] sm:text-6xl">A little sweet mail never hurt anybody.</h2></div>{subscribed ? <div className="flex max-w-sm items-center gap-3 rounded-2xl bg-[#fff8e8] p-4 text-sm font-bold"><Check className="h-5 w-5 text-[#ec6f69]" /> You’re on the sweet list.</div> : <form onSubmit={(event) => { event.preventDefault(); if (newsletter.trim()) setSubscribed(true); }} className="flex w-full max-w-sm flex-col gap-2 sm:flex-row lg:w-[360px]"><label className="sr-only" htmlFor="newsletter">Email address</label><input id="newsletter" type="email" required value={newsletter} onChange={(event) => setNewsletter(event.target.value)} placeholder="your@email.com" className="min-w-0 flex-1 rounded-full border-2 border-[#175345] bg-[#fff8e8] px-4 py-3 text-sm outline-none placeholder:text-[#175345]/50 focus:ring-2 focus:ring-[#f7c842]" data-testid="input-newsletter" /><button type="submit" className="rounded-full border-2 border-[#175345] bg-[#f7c842] px-5 py-3 text-sm font-bold shadow-[3px_3px_0_#175345] transition-transform hover:-translate-y-0.5" data-testid="button-newsletter">Keep me posted</button></form>}</div>
        </section>
      </main>

      <footer className="border-t-2 border-[#175345] bg-[#f7c842]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><div className="flex items-center gap-2"><GclLogo /><span className="font-display text-2xl font-bold">GurlBoss CandyLand</span></div><p className="mt-4 max-w-xs text-sm text-[#175345]/70">A sweet little corner of the internet, straight out of Jamaica.</p></div><div className="flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-widest"><button onClick={() => scrollTo('shop')} data-testid="footer-link-shop">Shop</button><button onClick={() => scrollTo('mix')} data-testid="footer-link-mix">Pick & Mix</button><button onClick={() => scrollTo('delivery')} data-testid="footer-link-delivery">Delivery</button><a href="https://www.tiktok.com/@1GURL_BOSSGCL" target="_blank" rel="noreferrer" className="flex items-center gap-2" data-testid="link-tiktok"><Music2 className="h-4 w-4" /> TikTok</a><a href="https://www.instagram.com/GURL_BOSSGCL" target="_blank" rel="noreferrer" className="flex items-center gap-2" data-testid="link-instagram"><Instagram className="h-4 w-4" /> Instagram</a></div></div>
        <div className="border-t border-[#175345]/20 px-5 py-4 text-center font-mono-brand text-[9px] uppercase tracking-[.16em] text-[#175345]/60">© 2024 GurlBoss CandyLand · Keep it sweet</div>
      </footer>

      {cartOpen && <div className="fixed inset-0 z-50 bg-[#175345]/35" role="presentation" onClick={() => setCartOpen(false)}>
        <aside className="absolute right-0 top-0 flex h-full w-full max-w-[470px] flex-col border-l-2 border-[#175345] bg-[#fff8e8] shadow-[-15px_0_45px_rgba(23,83,69,.18)]" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between border-b-2 border-[#ead9b4] px-6 py-5"><div><p className="font-mono-brand text-[9px] uppercase tracking-widest text-[#ec6f69]">Your sweet stash</p><h2 className="mt-1 font-display text-3xl font-bold">Shopping bag</h2></div><button onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#175345]" aria-label="Close shopping bag" data-testid="button-close-cart"><X className="h-5 w-5" /></button></div>
          {checkout ? <form onSubmit={sendOrderToWhatsApp} className="flex flex-1 flex-col overflow-y-auto px-6 py-6"><div className="flex items-start justify-between gap-4"><div><p className="font-mono-brand text-[9px] uppercase tracking-widest text-[#ec6f69]">Final step</p><h3 className="mt-2 font-display text-4xl font-bold">Send your order.</h3></div><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d9f5df] text-[#168341]"><MessageCircle className="h-6 w-6" /></div></div><p className="mt-3 text-sm leading-relaxed text-[#175345]/65">Add your details, then WhatsApp will open with your order ready to send to GurlBoss CandyLand.</p><div className="mt-6 space-y-4"><div><label className="font-mono-brand text-[9px] font-bold uppercase tracking-widest" htmlFor="customer-name">Your name</label><input id="customer-name" required value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="mt-2 w-full rounded-xl border-2 border-[#ead9b4] bg-[#fffdf5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#175345]" placeholder="Enter your name" data-testid="input-customer-name" /></div><div><label className="font-mono-brand text-[9px] font-bold uppercase tracking-widest" htmlFor="delivery-details">Delivery details</label><textarea id="delivery-details" required value={deliveryDetails} onChange={(event) => setDeliveryDetails(event.target.value)} className="mt-2 min-h-24 w-full resize-none rounded-xl border-2 border-[#ead9b4] bg-[#fffdf5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#175345]" placeholder="Area, address, or pickup preference" data-testid="input-delivery-details" /></div></div><div className="mt-6 rounded-2xl bg-[#f7e9bc] p-4 text-sm"><div className="flex justify-between font-bold"><span>Order total</span><span className="font-mono-brand">{currency(total)}</span></div><p className="mt-2 text-xs text-[#175345]/65">{cartCount} item{cartCount === 1 ? '' : 's'} · delivery {delivery === 0 ? 'free' : currency(delivery)}</p></div><button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#175345] bg-[#168341] px-5 py-3.5 text-sm font-bold text-white shadow-[3px_3px_0_#175345] transition-transform hover:-translate-y-0.5" data-testid="button-send-whatsapp"><MessageCircle className="h-5 w-5" /> Send order on WhatsApp</button><button type="button" onClick={() => setCheckout(false)} className="mt-3 rounded-full border-2 border-[#175345] px-6 py-3 text-sm font-bold" data-testid="button-back-to-bag">Back to bag</button><p className="mt-4 text-center text-[10px] text-[#175345]/55">WhatsApp will open in a new tab. Tap Send there to submit the order.</p></form> : cart.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f7c842]"><ShoppingBag className="h-8 w-8" /></div><h3 className="mt-6 font-display text-3xl font-bold">Your bag is taking a nap.</h3><p className="mt-3 max-w-xs text-sm text-[#175345]/65">Pop something sweet in here and we’ll get it ready to travel.</p><button onClick={() => { setCartOpen(false); scrollTo('shop'); }} className="mt-7 rounded-full border-2 border-[#175345] bg-[#175345] px-6 py-3 text-sm font-bold text-[#fff8e8]" data-testid="button-start-shopping">Start shopping</button></div> : <><div className="flex-1 overflow-y-auto px-6 py-5">{cart.map((item) => <div key={item.id} className="flex gap-3 border-b border-[#ead9b4] py-4 first:pt-0" data-testid={`cart-item-${item.id}`}>{item.image ? <CandyIllustration product={item} compact /> : <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f7c842]"><Gift className="h-7 w-7" /></div>}<div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><h3 className="font-display text-xl font-bold leading-none">{item.name}</h3><p className="mt-1 text-xs text-[#175345]/60">{currency(item.price)} each</p></div><button onClick={() => setCart((current) => current.filter((cartItem) => cartItem.id !== item.id))} className="text-[#175345]/50 hover:text-[#ec6f69]" aria-label={`Remove ${item.name}`} data-testid={`button-remove-${item.id}`}><X className="h-4 w-4" /></button></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center gap-3 rounded-full border border-[#d6c69f] px-2 py-1"><button onClick={() => updateQuantity(item.id, -1)} className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-[#f7c842]" aria-label={`Decrease ${item.name} quantity`} data-testid={`button-decrease-${item.name}`}><Minus className="h-3 w-3" /></button><span className="w-4 text-center font-mono-brand text-xs" data-testid={`text-quantity-${item.id}`}>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-[#f7c842]" aria-label={`Increase ${item.name} quantity`} data-testid={`button-increase-${item.name}`}><Plus className="h-4 w-4" /></button></div><span className="font-mono-brand text-sm font-medium">{currency(item.price * item.quantity)}</span></div></div></div>)}</div><div className="border-t-2 border-[#ead9b4] bg-[#fffdf5] px-6 py-5"><div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-mono-brand">{currency(subtotal)}</span></div><div className="mt-2 flex justify-between text-sm"><span>Delivery {delivery === 0 && <span className="text-[#ec6f69]">(free)</span>}</span><span className="font-mono-brand">{currency(delivery)}</span></div><div className="mt-4 flex justify-between border-t border-[#ead9b4] pt-4 font-display text-2xl font-bold"><span>Total</span><span data-testid="text-cart-total">{currency(total)}</span></div><button onClick={() => setCheckout(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#175345] bg-[#ec6f69] px-5 py-3.5 text-sm font-bold text-[#fff8e8] shadow-[3px_3px_0_#175345] transition-transform hover:-translate-y-0.5" data-testid="button-checkout">Continue to checkout <ChevronRight className="h-4 w-4" /></button><p className="mt-3 text-center text-[10px] text-[#175345]/50">Free island delivery in Montego Bay / Islandwide shipping available</p></div></>}
        </aside>
      </div>}
    </div>
  );
}

export default App;