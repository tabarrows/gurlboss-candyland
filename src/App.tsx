import { useMemo, useState, type ReactNode } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  Instagram,
  MessageCircle,
  ChevronRight,
  Check,
  Sparkles,
  Truck,
  Heart,
  Package,
} from 'lucide-react';
const gclFlyer = '';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  category: string;
  color: string;
  accent: string;
  tag?: string;
  image?: string;
  soldOut?: boolean;
  featured?: boolean;
};

type CartItem = Product & { quantity: number };

type GbfSize = {
  id: string;
  name: string;
  weight: string;
  description: string;
};

type MixSize = {
  id: string;
  name: string;
  weight: string;
  choices: number;
};

const whatsappOrderNumber = '18762346429';

/*
  ============================================================
  GURLBOSS CANDYLAND — EASY CATALOG
  ============================================================
  This is the section you will use later to manage products.

  price: number = put the selling price here.
  price: null   = shows "Coming Soon" until you add a price.
  soldOut: true = shows SOLD OUT and prevents ordering.
  soldOut: false / omitted = available.
  Delete a product object to remove it from the shop.

  IMPORTANT:
  We are using loose-candy / clear-bag illustrations until
  actual GCL product photos are added. We are NOT showing
  manufacturer candy wrappers as the customer product image.
  ============================================================
*/

const products: Product[] = [
  // ---------------- BUBS ----------------
  { id: 'bubs-tutti-frutti-skulls', name: 'BUBS Sour Tutti Frutti Skulls', price: null, category: 'BUBS', color: '#f59bb7', accent: '#fff1f6', tag: 'BUBS' },
  { id: 'bubs-bubblegum-skulls', name: 'BUBS Bubblegum Skulls SOUR', price: null, category: 'BUBS', color: '#ff9fcb', accent: '#fff0f7', tag: 'BUBS' },
  { id: 'bubs-strawberry-vanilla', name: 'BUBS Sour Strawberry Vanilla', price: null, category: 'BUBS', color: '#f58fae', accent: '#fff4f7', tag: 'BUBS' },
  { id: 'bubs-banana-toffee', name: 'BUBS Banana Toffee', price: null, category: 'BUBS', color: '#f4cf68', accent: '#fff8df', tag: 'BUBS' },
  { id: 'bubs-mini-banana-toffee', name: 'BUBS Mini Banana Toffee', price: null, category: 'BUBS', color: '#f4cf68', accent: '#fff8df', tag: 'BUBS' },
  { id: 'bubs-lemon-raspberry', name: 'BUBS Sour Lemon Raspberry Skulls', price: null, category: 'BUBS', color: '#ef7394', accent: '#fff1a8', tag: 'BUBS' },
  { id: 'bubs-cola-skulls', name: 'BUBS Cola Skulls', price: null, category: 'BUBS', color: '#8e5b52', accent: '#f6ddd7', tag: 'BUBS' },
  { id: 'bubs-fruity-pear', name: 'BUBS Fruity Pear', price: null, category: 'BUBS', color: '#a8d78e', accent: '#f4ffe9', tag: 'BUBS' },
  { id: 'bubs-forest-berry', name: 'BUBS Forest Berry', price: null, category: 'BUBS', color: '#8e6aaa', accent: '#f4ecff', tag: 'BUBS' },
  { id: 'bubs-strawberry-pomegranate', name: 'BUBS Strawberry Pomegranate', price: null, category: 'BUBS', color: '#d94b71', accent: '#ffe9ef', tag: 'BUBS' },
  { id: 'bubs-sour-raspberry-foam', name: 'BUBS Sour Raspberry Foam', price: null, category: 'BUBS', color: '#e9799b', accent: '#fff0f5', tag: 'BUBS' },
  { id: 'bubs-sour-foam-hearts', name: 'BUBS Sour Foam Hearts', price: null, category: 'BUBS', color: '#f08eae', accent: '#fff0f5', tag: 'BUBS' },
  { id: 'bubs-wild-strawberry', name: 'BUBS Wild Strawberry', price: null, category: 'BUBS', color: '#ee668b', accent: '#fff0f4', tag: 'BUBS' },
  { id: 'bubs-go-banana', name: 'BUBS Go Banana', price: null, category: 'BUBS', color: '#f4d65e', accent: '#fffbe5', tag: 'BUBS' },

  // ---------------- S-MÄRKE ----------------
  { id: 'smarke-strawberry', name: 'S-Märke Sour Strawberry', price: null, category: 'S-Märke Swedish Candy', color: '#e86a91', accent: '#fff0f4', tag: 'S-Märke' },
  { id: 'smarke-raspberry', name: 'S-Märke Sour Raspberry', price: null, category: 'S-Märke Swedish Candy', color: '#d85b8d', accent: '#fff0f5', tag: 'S-Märke' },
  { id: 'smarke-cherry', name: 'S-Märke Sour Cherry', price: null, category: 'S-Märke Swedish Candy', color: '#c94b58', accent: '#ffe9ec', tag: 'S-Märke' },
  { id: 'smarke-dragonfruit-peach', name: 'S-Märke Dragon Fruit Peach', price: null, category: 'S-Märke Swedish Candy', color: '#f28d86', accent: '#fff1e8', tag: 'S-Märke' },
  { id: 'smarke-blue-raspberry', name: 'S-Märke Blue Raspberry', price: null, category: 'S-Märke Swedish Candy', color: '#72a7d7', accent: '#eef7ff', tag: 'S-Märke' },
  { id: 'smarke-watermelon', name: 'S-Märke Watermelon', price: null, category: 'S-Märke Swedish Candy', color: '#ee7d88', accent: '#eaf6d8', tag: 'S-Märke' },
  { id: 'smarke-sour-lemon', name: 'S-Märke Sour Lemon', price: null, category: 'S-Märke Swedish Candy', color: '#e9d85b', accent: '#fffde6', tag: 'S-Märke' },
  { id: 'smarke-sour-apple', name: 'S-Märke Sour Apple', price: null, category: 'S-Märke Swedish Candy', color: '#8fcf83', accent: '#f1ffe9', tag: 'S-Märke' },
  { id: 'smarke-sour-cola', name: 'S-Märke Sour Cola', price: null, category: 'S-Märke Swedish Candy', color: '#956258', accent: '#f8e8e3', tag: 'S-Märke' },
  { id: 'smarke-tutti-frutti', name: 'S-Märke Tutti Frutti', price: null, category: 'S-Märke Swedish Candy', color: '#df7ba2', accent: '#fff0f7', tag: 'S-Märke' },

  // ---------------- VIRAL EXTRAS ----------------
  { id: 'wax-bottle-candy', name: 'Wax Bottle Candy', price: null, category: 'Viral Extras', color: '#f3b6cf', accent: '#fff5fa', tag: 'Viral' },
  { id: 'gooey-gummy-filled', name: 'Gooey / Gummy Filled Candies', price: null, category: 'Viral Extras', color: '#e98ba8', accent: '#fff0f5', tag: 'Viral' },
  { id: 'salt-water-taffy', name: 'Salt Water Taffy — Assorted', price: null, category: 'Salt Water Taffy', color: '#f3c7d8', accent: '#fff9fc', tag: 'Assorted' },
];

const categories = [
  'All treats',
  'BUBS',
  'S-Märke Swedish Candy',
  'Viral Extras',
  'Salt Water Taffy',
  'GBF — GurlBoss Fave',
  'Pick & Mix',
  'Worldwide Imports',
];

const gbfSizes: GbfSize[] = [
  { id: 'gbf-1', name: '1 LB GBF', weight: '1 LB', description: 'GurlBoss signature pink, red & white candy mix.' },
  { id: 'gbf-2', name: '2 LB GBF', weight: '2 LB', description: 'Our signature size — a fuller GurlBoss Fave platter.' },
  { id: 'gbf-3', name: '3 LB GBF', weight: '3 LB', description: 'Extra generous for bigger sweet cravings.' },
  { id: 'gbf-party', name: 'Party Platter', weight: 'Party', description: 'A larger signature platter for sharing and celebrations.' },
];

const mixSizes: MixSize[] = [
  { id: 'half', name: '½ LB', weight: '½ LB', choices: 5 },
  { id: 'one', name: '1 LB', weight: '1 LB', choices: 10 },
  { id: 'two', name: '2 LB', weight: '2 LB', choices: 10 },
  { id: 'three', name: '3 LB', weight: '3 LB', choices: 15 },
];

const mixOptions = products.filter((p) => p.category === 'BUBS' || p.category === 'S-Märke Swedish Candy');

const gbfColors = ['#ef8fb1', '#d94b68', '#fff7fa', '#f4b1c7', '#c93455', '#ffe8ee'];

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function ClearCandyBagIllustration({ color, accent }: { color: string; accent: string }) {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-3xl border border-pink-100 bg-white/80">
      <div
        className="absolute left-1/2 top-7 h-7 w-24 -translate-x-1/2 rounded-full border border-pink-200 bg-pink-100"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-10 h-32 w-36 -translate-x-1/2 rounded-b-[2rem] rounded-t-lg border-2 border-white/90 shadow-sm"
        style={{ background: 'rgba(255,255,255,.72)' }}
        aria-label="Loose candy in a clear bag"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full shadow-sm"
            style={{
              width: `${18 + (i % 3) * 4}px`,
              height: `${14 + (i % 2) * 5}px`,
              left: `${12 + ((i * 23) % 102)}px`,
              top: `${55 + ((i * 19) % 68)}px`,
              background: i % 3 === 0 ? color : i % 3 === 1 ? accent : '#ffffff',
              transform: `rotate(${i * 17}deg)`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">
        loose candy
      </div>
    </div>
  );
}

function GbfPlatterIllustration() {
  return (
    <div className="relative h-56 overflow-hidden rounded-[2rem] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-red-50">
      <div className="absolute left-1/2 top-10 h-36 w-64 -translate-x-1/2 rounded-[50%] border-8 border-white bg-white/80 shadow-lg">
        {Array.from({ length: 22 }).map((_, i) => {
          const angle = (i / 22) * Math.PI * 2;
          const radius = 72 - (i % 3) * 8;
          const x = 128 + Math.cos(angle) * radius;
          const y = 72 + Math.sin(angle) * radius * 0.48;
          return (
            <span
              key={i}
              className="absolute h-5 w-7 rounded-full shadow-sm"
              style={{
                left: x,
                top: y,
                background: gbfColors[i % gbfColors.length],
                transform: `rotate(${i * 19}deg)`,
              }}
            />
          );
        })}
        <div className="absolute left-1/2 top-1/2 flex h-20 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-pink-200 bg-white/90 text-center shadow-sm">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-pink-500">GCL</div>
            <div className="text-sm font-black text-pink-700">GBF</div>
            <div className="text-[8px] font-bold uppercase tracking-wider text-red-400">GurlBoss Fave</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-pink-500">{eyebrow}</div>
        <h2 className="text-3xl font-black tracking-tight text-pink-950 md:text-4xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All treats');

  const [mixSizeId, setMixSizeId] = useState('half');
  const [mix, setMix] = useState<string[]>([]);

  const [gbfSizeId, setGbfSizeId] = useState('gbf-2');

  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Montego Bay delivery');
  const [deliveryDetails, setDeliveryDetails] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All treats') return products;
    if (activeCategory === 'GBF — GurlBoss Fave' || activeCategory === 'Pick & Mix') return [];
    if (activeCategory === 'Worldwide Imports') return [];
    return products.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedMixSize = mixSizes.find((size) => size.id === mixSizeId) ?? mixSizes[0];
  const selectedGbfSize = gbfSizes.find((size) => size.id === gbfSizeId) ?? gbfSizes[1];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);

  // Delivery fees have NOT been set yet. Keep the checkout honest until GCL
  // confirms its exact Jamaica delivery/shipping charges.
  const deliveryFee: number | null = null;
  const total = subtotal + (deliveryFee ?? 0);

  function addToCart(product: Product) {
    if (product.soldOut || product.price === null) return;

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id: string, change: number) {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function toggleMix(id: string) {
    setMix((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= selectedMixSize.choices) return current;
      return [...current, id];
    });
  }

  function sendOrderToWhatsApp() {
    if (!customerName.trim() || !customerWhatsApp.trim() || !deliveryDetails.trim() || !paymentConfirmed) return;

    const lines = cart.map(
      (item) => `• ${item.name} x${item.quantity} — ${formatMoney((item.price ?? 0) * item.quantity)}`,
    );

    const message = [
      '🍭 GURLBOSS CANDYLAND ORDER',
      '',
      `Name: ${customerName}`,
      `Customer WhatsApp: ${customerWhatsApp}`,
      `Delivery: ${deliveryOption}`,
      `Location/details: ${deliveryDetails}`,
      '',
      ...lines,
      '',
      `Subtotal: ${formatMoney(subtotal)}`,
      `Delivery: To be confirmed`,
      `Order total before delivery: ${formatMoney(total)}`,
      `Payment reference: ${paymentReference || 'Not provided'}`,
      'Payment confirmed by customer: YES',
      '',
      'Please confirm my order with GurlBoss CandyLand.',
    ].join('\n');

    window.open(`https://wa.me/${whatsappOrderNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenu(false);
  }

  return (
    <div className="min-h-screen bg-white text-pink-950">
      {/* TOP BAR */}
      <div className="bg-pink-600 px-4 py-2 text-center text-xs font-bold text-white">
        Free delivery in Montego Bay • Islandwide shipment via Knutsford
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-pink-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <button type="button" onClick={() => scrollTo('home')} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-pink-600">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="text-lg font-black leading-none text-pink-800">GurlBoss</div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">CandyLand</div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-bold md:flex">
            <button type="button" onClick={() => scrollTo('shop')} className="hover:text-pink-600">Shop sweets</button>
            <button type="button" onClick={() => scrollTo('pick-mix')} className="hover:text-pink-600">Build a box</button>
            <button type="button" onClick={() => scrollTo('delivery')} className="hover:text-pink-600">Delivery</button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 items-center gap-2 rounded-full bg-pink-100 px-4 text-sm font-black text-pink-700 hover:bg-pink-200"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenu((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 md:hidden"
              aria-label="Open menu"
            >
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-pink-100 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1 text-sm font-bold">
              <button type="button" onClick={() => scrollTo('shop')} className="rounded-xl px-3 py-3 text-left hover:bg-pink-50">Shop sweets</button>
              <button type="button" onClick={() => scrollTo('pick-mix')} className="rounded-xl px-3 py-3 text-left hover:bg-pink-50">Build a box</button>
              <button type="button" onClick={() => scrollTo('delivery')} className="rounded-xl px-3 py-3 text-left hover:bg-pink-50">Delivery</button>
            </div>
          </div>
        )}
      </header>

      {/* HERO — FLYER BACKGROUND PRESERVED */}
      <section
        id="home"
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.72), rgba(255,247,251,.9)), url(${gclFlyer})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-pink-600">
              <Sparkles className="h-4 w-4" />
              Sweet things are coming
            </div>
            <h1 className="max-w-2xl text-5xl font-black leading-[.95] tracking-tight text-pink-950 md:text-7xl">
              Big sweet
              <span className="block text-pink-600">feelings.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-pink-900/75">
              GurlBoss CandyLand brings you loose Swedish candy, viral treats, Pick & Mix fun, and our signature GBF platters — all with that GurlBoss touch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollTo('shop')} className="rounded-full bg-pink-600 px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-pink-700">
                Shop the candy
              </button>
              <button type="button" onClick={() => scrollTo('pick-mix')} className="rounded-full border border-pink-300 bg-white/80 px-6 py-3 text-sm font-black text-pink-700 hover:bg-white">
                Build a Pick & Mix
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-xl backdrop-blur">
            <GbfPlatterIllustration />
            <div className="px-2 pb-2 pt-5">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-red-500">Featured</div>
              <h3 className="mt-1 text-2xl font-black text-pink-900">GBF — GurlBoss Fave</h3>
              <p className="mt-2 text-sm leading-6 text-pink-900/70">
                Your signature platter. You choose the size — GurlBoss chooses the pink, red & white candy mix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionTitle eyebrow="The candy counter" title="Pick your happy.">
          <div className="text-sm font-semibold text-pink-900/60">Loose candy • GCL style</div>
        </SectionTitle>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black ${
                activeCategory === category
                  ? 'bg-pink-600 text-white'
                  : 'border border-pink-200 bg-white text-pink-700 hover:bg-pink-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {activeCategory === 'GBF — GurlBoss Fave' ? (
          <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-br from-pink-50 to-white p-5 md:p-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <GbfPlatterIllustration />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-red-500">Signature platter</div>
                <h3 className="mt-2 text-3xl font-black text-pink-950">GurlBoss Fave</h3>
                <p className="mt-3 leading-7 text-pink-900/70">
                  This is not Pick & Mix. The candy combination is selected by GurlBoss and built around our signature pink, red and white look.
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {gbfSizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setGbfSizeId(size.id)}
                      className={`rounded-2xl border p-4 text-left ${
                        gbfSizeId === size.id ? 'border-pink-500 bg-white shadow-sm' : 'border-pink-100 bg-white/60'
                      }`}
                    >
                      <div className="font-black text-pink-800">{size.name}</div>
                      <div className="mt-1 text-xs font-semibold text-pink-900/55">{size.description}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-white p-4 text-sm">
                  <div className="font-black text-pink-800">{selectedGbfSize.name}</div>
                  <div className="mt-1 text-pink-900/65">
                    Price: <span className="font-bold">Coming Soon</span>
                  </div>
                  <div className="mt-2 text-xs text-pink-900/55">
                    We'll add the selling prices after your candy cost, packaging and platter costs are confirmed.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeCategory === 'Pick & Mix' ? (
          <PickMixCard
            mixSize={selectedMixSize}
            mix={mix}
            options={mixOptions}
            onSizeChange={(id) => {
              setMixSizeId(id);
              const size = mixSizes.find((item) => item.id === id) ?? mixSizes[0];
              setMix((current) => current.slice(0, size.choices));
            }}
            onToggle={toggleMix}
          />
        ) : activeCategory === 'Worldwide Imports' ? (
          <div className="rounded-[2rem] border border-dashed border-pink-200 bg-pink-50/50 p-10 text-center">
            <Package className="mx-auto h-10 w-10 text-pink-400" />
            <h3 className="mt-4 text-2xl font-black text-pink-900">Worldwide Imports</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-pink-900/65">
              Coming soon. We'll add these only when the inventory is confirmed, so the website never promises candy you don't have.
            </p>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl bg-pink-50 p-10 text-center font-bold text-pink-800">Nothing here yet.</div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="overflow-hidden rounded-[1.5rem] border border-pink-100 bg-white shadow-sm">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                    ) : (
                      <ClearCandyBagIllustration color={product.color} accent={product.accent} />
                    )}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-pink-600">
                          {product.tag ?? product.category}
                        </span>
                        {product.soldOut && (
                          <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-black uppercase text-red-600">Sold Out</span>
                        )}
                      </div>
                      <h3 className="mt-3 min-h-12 font-black text-pink-950">{product.name}</h3>
                      <p className="mt-2 min-h-10 text-xs leading-5 text-pink-900/55">
                        Loose candy packed by GurlBoss CandyLand.
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className="font-black text-pink-700">
                          {product.price === null ? 'Coming Soon' : formatMoney(product.price)}
                        </div>
                        <button
                          type="button"
                          disabled={product.price === null || product.soldOut}
                          onClick={() => addToCart(product)}
                          className="rounded-full bg-pink-600 px-4 py-2 text-xs font-black text-white disabled:cursor-not-allowed disabled:bg-pink-100 disabled:text-pink-400"
                        >
                          {product.soldOut ? 'Sold Out' : product.price === null ? 'Coming Soon' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* PICK & MIX */}
      <section id="pick-mix" className="border-y border-pink-100 bg-pink-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <SectionTitle eyebrow="Build it your way" title="Pick & Mix">
            <div className="rounded-full bg-white px-4 py-2 text-xs font-black text-pink-700">
              Your candy • Your choices
            </div>
          </SectionTitle>
          <PickMixCard
            mixSize={selectedMixSize}
            mix={mix}
            options={mixOptions}
            onSizeChange={(id) => {
              setMixSizeId(id);
              const size = mixSizes.find((item) => item.id === id) ?? mixSizes[0];
              setMix((current) => current.slice(0, size.choices));
            }}
            onToggle={toggleMix}
          />
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionTitle eyebrow="Sweet delivery" title="From GCL to you.">
          <Truck className="h-8 w-8 text-pink-500" />
        </SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard icon={<Heart className="h-5 w-5" />} title="Montego Bay" text="Free delivery in Montego Bay." />
          <InfoCard icon={<Truck className="h-5 w-5" />} title="Islandwide" text="Islandwide shipment via Knutsford." />
          <InfoCard icon={<Package className="h-5 w-5" />} title="Packed with care" text="Your loose candy is prepared and packed by GurlBoss CandyLand." />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pink-950 px-4 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-2xl font-black">GurlBoss CandyLand</div>
            <p className="mt-2 max-w-md text-sm leading-6 text-pink-100/70">
              Sweet treats, Swedish candy, Pick & Mix and the signature GBF — made for the sweet girls.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/GURL_BOSSGCL" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.tiktok.com/@1GURL_BOSSGCL" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="TikTok">
              ♪
            </a>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-pink-950/30" onClick={() => setCartOpen(false)}>
          <aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-pink-100 p-5">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-pink-500">Your bag</div>
                <h2 className="text-2xl font-black text-pink-950">Sweet order</h2>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-pink-200" />
                  <p className="mt-4 font-black text-pink-900">Your bag is empty.</p>
                  <p className="mt-1 text-sm text-pink-900/55">Let's add something sweet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-pink-100 p-4">
                      <div className="font-black text-pink-900">{item.name}</div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-black">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="font-black text-pink-700">{formatMoney((item.price ?? 0) * item.quantity)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-pink-100 p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-900/60">Subtotal</span>
                  <span className="font-black">{formatMoney(subtotal)}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-pink-900/60">Delivery</span>
                  <span className="font-bold text-pink-700">To be confirmed</span>
                </div>
                <div className="mt-4 flex justify-between border-t border-pink-100 pt-4 text-lg">
                  <span className="font-black">Total before delivery</span>
                  <span className="font-black text-pink-700">{formatMoney(total)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckout(true)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 py-3.5 text-sm font-black text-white hover:bg-pink-700"
                >
                  Checkout <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* CHECKOUT */}
      {checkout && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-pink-950/40 p-4 md:p-8">
          <div className="mx-auto max-w-2xl rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-pink-100 p-5 md:p-7">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-pink-500">Checkout</div>
                <h2 className="text-2xl font-black text-pink-950">Let's get your candy to you.</h2>
              </div>
              <button type="button" onClick={() => setCheckout(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5 md:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-bold text-pink-900">
                  Name
                  <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-2 w-full rounded-xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-500" placeholder="Your name" />
                </label>
                <label className="text-sm font-bold text-pink-900">
                  WhatsApp number
                  <input value={customerWhatsApp} onChange={(e) => setCustomerWhatsApp(e.target.value)} className="mt-2 w-full rounded-xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-500" placeholder="876..." />
                </label>
              </div>

              <label className="block text-sm font-bold text-pink-900">
                Delivery option
                <select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)} className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 outline-none focus:border-pink-500">
                  <option>Montego Bay delivery</option>
                  <option>Islandwide shipment via Knutsford</option>
                </select>
              </label>

              <label className="block text-sm font-bold text-pink-900">
                Delivery location / details
                <textarea value={deliveryDetails} onChange={(e) => setDeliveryDetails(e.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-500" placeholder="Tell us where/how you want your order delivered." />
              </label>

              <div className="rounded-2xl border border-pink-100 bg-pink-50/60 p-5">
                <div className="flex items-center gap-2 font-black text-pink-900">
                  <MessageCircle className="h-5 w-5 text-pink-600" />
                  Payment confirmation
                </div>
                <p className="mt-2 text-sm leading-6 text-pink-900/65">
                  The final payment method and NCB payment instructions will be added once the GCL payment details are confirmed. Do not send the WhatsApp order until payment has actually been made.
                </p>

                <label className="mt-4 block text-sm font-bold text-pink-900">
                  Payment reference (optional for now)
                  <input value={paymentReference} onChange={(e) => setPaymentReference(e.target.value)} className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 outline-none focus:border-pink-500" placeholder="Reference / confirmation number" />
                </label>

                <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-semibold text-pink-900">
                  <input type="checkbox" checked={paymentConfirmed} onChange={(e) => setPaymentConfirmed(e.target.checked)} className="mt-1 h-4 w-4 accent-pink-600" />
                  <span>I have completed payment and understand my order should only be sent after payment is made.</span>
                </label>
              </div>

              <div className="rounded-2xl bg-pink-950 p-5 text-white">
                <div className="flex justify-between text-sm text-pink-100/70">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-pink-100/70">
                  <span>Delivery</span>
                  <span>To be confirmed</span>
                </div>
                <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg">
                  <span className="font-black">Total before delivery</span>
                  <span className="font-black">{formatMoney(total)}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={!customerName.trim() || !customerWhatsApp.trim() || !deliveryDetails.trim() || !paymentConfirmed}
                onClick={sendOrderToWhatsApp}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              >
                <MessageCircle className="h-5 w-5" />
                Send Paid Order on WhatsApp
              </button>

              <p className="text-center text-xs leading-5 text-pink-900/50">
                The button stays locked until your customer confirms payment and completes the required order details.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PickMixCard({
  mixSize,
  mix,
  options,
  onSizeChange,
  onToggle,
}: {
  mixSize: MixSize;
  mix: string[];
  options: Product[];
  onSizeChange: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid gap-8 rounded-[2rem] border border-pink-100 bg-white p-5 shadow-sm md:p-8 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-pink-500">
          <Sparkles className="h-4 w-4" /> Build your own
        </div>
        <h3 className="mt-2 text-3xl font-black text-pink-950">Pick & Mix</h3>
        <p className="mt-3 text-sm leading-6 text-pink-900/65">
          Choose your bag size, then pick your candy varieties. The number of choices is limited by the size so every mix stays balanced.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {mixSizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => onSizeChange(size.id)}
              className={`rounded-2xl border p-4 text-left ${
                mixSize.id === size.id ? 'border-pink-500 bg-pink-50' : 'border-pink-100 bg-white'
              }`}
            >
              <div className="font-black text-pink-800">{size.name}</div>
              <div className="mt-1 text-xs font-bold text-pink-900/55">{size.choices} choices</div>
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-pink-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-pink-900">Choices selected</span>
            <span className="text-lg font-black text-pink-600">{mix.length} / {mixSize.choices}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-pink-500 transition-all"
              style={{ width: `${Math.min(100, (mix.length / mixSize.choices) * 100)}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-pink-900/60">
            This is a selection limit, not a piece count. GCL will pack the chosen varieties into the selected total weight.
          </p>
        </div>

        <button
          type="button"
          disabled={mix.length === 0}
          className="mt-5 w-full rounded-full bg-pink-600 py-3.5 text-sm font-black text-white disabled:bg-pink-100 disabled:text-pink-400"
        >
          Price Coming Soon
        </button>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-black text-pink-900">Choose your candy</div>
          <div className="text-xs font-bold text-pink-900/50">{mix.length} selected</div>
        </div>
        <div className="grid max-h-[34rem] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
          {options.map((option) => {
            const selected = mix.includes(option.id);
            const locked = !selected && mix.length >= mixSize.choices;
            return (
              <button
                key={option.id}
                type="button"
                disabled={locked}
                onClick={() => onToggle(option.id)}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  selected ? 'border-pink-500 bg-pink-50' : 'border-pink-100 bg-white'
                } ${locked ? 'cursor-not-allowed opacity-40' : 'hover:border-pink-300'}`}
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <ClearCandyBagIllustration color={option.color} accent={option.accent} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-pink-900">{option.name}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-pink-500">{option.tag}</div>
                </div>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${selected ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-300'}`}>
                  {selected && <Check className="h-4 w-4" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-pink-100 bg-pink-50/50 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-pink-600">{icon}</div>
      <h3 className="mt-5 text-lg font-black text-pink-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-pink-900/65">{text}</p>
    </div>
  );
}
