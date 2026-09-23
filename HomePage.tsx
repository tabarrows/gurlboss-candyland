import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Candy, ArrowRight, Star, Truck, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';
import { HERO_IMAGE, ASSORTED_CANDY_IMAGE, COLORFUL_CANDY_IMAGE, PLATTER_IMAGE } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { useSettings } from '@/lib/use-settings';

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });
      if (data) setFeatured(data as Product[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gcl-pink-50 via-white to-gcl-pink-100">
        <div className="absolute inset-0 opacity-10">
          <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-gcl-pink-100 px-4 py-1.5 text-xs font-semibold text-gcl-pink-600 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Jamaica's Sweetest Candy Shop
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gcl-pink-600 mb-4 leading-tight">
                GurlBoss CandyLand
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
                Fun, colorful, and premium candy — build your own mix, grab a signature platter, or shop your favorites. Delivered fresh across Jamaica.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link to="/shop" className="btn-primary">
                  <ShoppingBag className="h-4 w-4" />
                  Shop Candy
                </Link>
                <Link to="/pick-and-mix" className="btn-secondary">
                  <Candy className="h-4 w-4" />
                  Pick & Mix
                </Link>
                <Link to="/gurlboss-fave" className="btn-secondary">
                  <Star className="h-4 w-4" />
                  GurlBoss Fave
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img src={HERO_IMAGE} alt="Assorted candy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-bounce-subtle">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gcl-pink-100">
                  <Heart className="h-6 w-6 text-gcl-pink-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">50+ Candy Options</p>
                  <p className="text-[10px] text-gray-500">Pick your favorites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      {settings.promo_text && (
        <div className="bg-gcl-pink-500 text-white py-3">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm font-medium">
            {settings.promo_text}
          </div>
        </div>
      )}

      {/* Delivery Banner */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gcl-pink-500" />
              <span className="text-sm font-semibold text-gray-700">FREE Delivery in Montego Bay</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gcl-pink-500" />
              <span className="text-sm font-semibold text-gray-700">Islandwide shipping via Knutsford</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Treats</h2>
              <p className="text-sm text-gray-500 mt-1">Our most popular candy and platters</p>
            </div>
            <Link to="/shop" className="text-sm font-semibold text-gcl-pink-600 hover:text-gcl-pink-700 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.filter(p => p.is_featured).slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} categoryName={p.category?.name} />
              ))}
              {featured.filter(p => p.is_featured).length < 4 &&
                featured.filter(p => !p.is_featured).slice(0, 4 - featured.filter(p => p.is_featured).length).map((p) => (
                  <ProductCard key={p.id} product={p} categoryName={p.category?.name} />
                ))
              }
            </div>
          )}
        </div>
      </section>

      {/* Pick & Mix CTA */}
      <section className="py-16 bg-gradient-to-br from-gcl-pink-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src={ASSORTED_CANDY_IMAGE} alt="Pick and Mix candy" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gcl-pink-100 px-4 py-1.5 text-xs font-semibold text-gcl-pink-600 mb-4">
                <Candy className="h-3.5 w-3.5" />
                Build Your Own
              </span>
              <h2 className="section-title mb-4">Pick & Mix Your Favorites</h2>
              <p className="text-gray-600 mb-6">
                Choose your size, then pick from 50+ candy options to create your perfect custom mix. From gummy bears to sour worms, chocolates to international treats — the choice is yours!
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { size: '1/2 LB', choices: settings.pickmix_half_lb_choices },
                  { size: '1 LB', choices: settings.pickmix_1lb_choices },
                  { size: '2 LB', choices: settings.pickmix_2lb_choices },
                  { size: '3 LB', choices: settings.pickmix_3lb_choices },
                ].map((s) => (
                  <div key={s.size} className="rounded-xl bg-white border border-gcl-pink-100 p-3 text-center">
                    <p className="text-sm font-bold text-gcl-pink-600">{s.size}</p>
                    <p className="text-xs text-gray-500">Up to {s.choices} choices</p>
                  </div>
                ))}
              </div>
              <Link to="/pick-and-mix" className="btn-primary">
                Start Mixing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GBF CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-gcl-red-100 px-4 py-1.5 text-xs font-semibold text-gcl-red-600 mb-4">
                <Star className="h-3.5 w-3.5" />
                Signature Product
              </span>
              <h2 className="section-title mb-4">GurlBoss Fave — Candy Platter</h2>
              <p className="text-gray-600 mb-6">
                The GBF is a real candy platter — a beautiful tray loaded with your choice of loose assorted candy, arranged to perfection. Available in 1 LB, 2 LB, 3 LB, and Party Platter sizes. The ultimate gift for any candy lover.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { size: '1 LB', choices: settings.gbf_1lb_choices },
                  { size: '2 LB', choices: settings.gbf_2lb_choices },
                  { size: '3 LB', choices: settings.gbf_3lb_choices },
                  { size: 'Party', choices: settings.gbf_party_choices },
                ].map((s) => (
                  <div key={s.size} className="rounded-xl bg-gcl-pink-50 border border-gcl-pink-100 p-3 text-center">
                    <p className="text-sm font-bold text-gcl-pink-600">{s.size}</p>
                    <p className="text-xs text-gray-500">Up to {s.choices} choices</p>
                  </div>
                ))}
              </div>
              <Link to="/gurlboss-fave" className="btn-primary">
                Build Your Platter <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src={PLATTER_IMAGE} alt="GurlBoss Fave candy platter" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gradient-to-br from-gcl-pink-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-2">Shop by Category</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Explore our candy selection</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Gummy & Chewy', icon: Candy, img: COLORFUL_CANDY_IMAGE },
              { name: 'Sour', icon: Sparkles, img: ASSORTED_CANDY_IMAGE },
              { name: 'Chocolate', icon: Heart, img: COLORFUL_CANDY_IMAGE },
              { name: 'International', icon: Star, img: ASSORTED_CANDY_IMAGE },
            ].map((cat) => (
              <Link
                key={cat.name}
                to="/shop"
                className="group relative rounded-2xl overflow-hidden aspect-square bg-gcl-pink-100"
              >
                <img src={cat.img} alt={cat.name} className="h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <cat.icon className="h-8 w-8 text-white mb-2 drop-shadow-lg" />
                  <span className="text-sm font-bold text-white drop-shadow-lg text-center">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
