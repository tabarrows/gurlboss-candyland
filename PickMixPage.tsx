import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Candy, CartItem } from '@/lib/types';
import { CANDY_IMAGES, formatPrice } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useSettings } from '@/lib/use-settings';
import { Check, X, ShoppingBag, Candy as CandyIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PickMixPage() {
  const { addItem } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [candies, setCandies] = useState<Candy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selections, setSelections] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const [{ data: prods }, { data: cand }] = await Promise.all([
        supabase.from('products').select('*').eq('product_type', 'pickmix').eq('is_visible', true).order('sort_order'),
        supabase.from('candies').select('*').eq('is_active', true).order('sort_order'),
      ]);
      if (prods) setProducts(prods as Product[]);
      if (cand) setCandies(cand as Candy[]);
      setLoading(false);
    })();
  }, []);

  const currentProduct = useMemo(
    () => products.find((p) => p.slug === selectedSize),
    [products, selectedSize]
  );

  const maxChoices = currentProduct?.max_candy_choices ?? 0;

  const groupedCandies = useMemo(() => {
    const groups: Record<string, Candy[]> = {};
    candies.forEach((c) => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c);
    });
    return groups;
  }, [candies]);

  const toggleCandy = (name: string) => {
    setError('');
    if (selections.includes(name)) {
      setSelections(selections.filter((c) => c !== name));
    } else {
      if (selections.length >= maxChoices) {
        setError(`You can select up to ${maxChoices} candies for this size.`);
        return;
      }
      setSelections([...selections, name]);
    }
  };

  const handleAddToCart = () => {
    if (!currentProduct) return;
    if (selections.length === 0) {
      setError('Please select at least one candy.');
      return;
    }
    if (selections.length > maxChoices) {
      setError(`You can only select up to ${maxChoices} candies.`);
      return;
    }
    const item: CartItem = {
      key: `${currentProduct.id}-${Date.now()}`,
      product_id: currentProduct.id,
      product_name: currentProduct.name,
      product_slug: currentProduct.slug,
      product_type: 'pickmix',
      price_cents: currentProduct.price_cents ?? 0,
      quantity: 1,
      size_label: currentProduct.size_label,
      image_url: currentProduct.image_url,
      candy_selections: selections,
      max_candy_choices: maxChoices,
    };
    addItem(item);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-gcl-pink-200 border-t-gcl-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-gcl-pink-50 to-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-gcl-pink-100 px-4 py-1.5 text-xs font-semibold text-gcl-pink-600 mb-3">
            <CandyIcon className="h-3.5 w-3.5" />
            Build Your Own
          </span>
          <h1 className="font-display text-3xl text-gcl-pink-600 mb-2">Pick & Mix</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Choose your size, then pick your favorite candies to create a custom mix just for you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Choose Size */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gcl-pink-500 text-white text-sm mr-2">1</span>
            Choose Your Size
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedSize(p.slug);
                  setSelections([]);
                  setError('');
                }}
                disabled={p.is_sold_out}
                className={`relative rounded-2xl border-2 p-4 text-center transition-all ${
                  selectedSize === p.slug
                    ? 'border-gcl-pink-500 bg-gcl-pink-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gcl-pink-300'
                } ${p.is_sold_out ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {p.is_sold_out && (
                  <span className="absolute top-2 right-2 badge bg-gray-800 text-white">Sold Out</span>
                )}
                <p className="text-lg font-bold text-gcl-pink-600">{p.size_label}</p>
                <p className="text-xs text-gray-500 mt-1">Up to {p.max_candy_choices} choices</p>
                <p className="text-sm font-semibold text-gray-900 mt-2">{formatPrice(p.price_cents)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Candies */}
        {selectedSize && currentProduct && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-lg font-bold text-gray-900">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gcl-pink-500 text-white text-sm mr-2">2</span>
                Choose Your Candies
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-gcl-pink-50 px-4 py-2">
                  <span className="text-sm font-bold text-gcl-pink-600">YOUR SELECTION</span>
                  <span className="text-sm font-bold text-gcl-pink-600">
                    {selections.length} / {maxChoices} CHOICES
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gcl-pink-400 to-gcl-pink-600 transition-all duration-300"
                  style={{ width: `${(selections.length / maxChoices) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {selections.length === 0
                  ? `Select up to ${maxChoices} candies`
                  : selections.length === maxChoices
                  ? 'Selection full! Remove a candy to change your picks.'
                  : `${maxChoices - selections.length} choice${maxChoices - selections.length !== 1 ? 's' : ''} remaining`}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-gcl-red-50 border border-gcl-red-200 px-4 py-3 text-sm text-gcl-red-600">
                {error}
              </div>
            )}

            {/* Candy Grid by Category */}
            <div className="space-y-6">
              {Object.entries(groupedCandies).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {items.map((candy) => {
                      const isSelected = selections.includes(candy.name);
                      const isDisabled = !isSelected && selections.length >= maxChoices;
                      return (
                        <button
                          key={candy.id}
                          onClick={() => toggleCandy(candy.name)}
                          disabled={isDisabled}
                          className={`relative rounded-2xl border-2 overflow-hidden transition-all text-left ${
                            isSelected
                              ? 'border-gcl-pink-500 shadow-md ring-2 ring-gcl-pink-200'
                              : isDisabled
                              ? 'border-gray-200 opacity-40 cursor-not-allowed'
                              : 'border-gray-200 hover:border-gcl-pink-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="aspect-square bg-gcl-pink-50 relative">
                            <img
                              src={candy.image_url || CANDY_IMAGES[candy.name] || CANDY_IMAGES['Skittles']}
                              alt={candy.name}
                              className="h-full w-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gcl-pink-500 text-white shadow-md">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="p-2.5">
                            <p className={`text-xs font-semibold ${isSelected ? 'text-gcl-pink-600' : 'text-gray-700'}`}>
                              {candy.name}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Candies Summary */}
            {selections.length > 0 && (
              <div className="mt-8 rounded-2xl bg-gcl-pink-50 border border-gcl-pink-100 p-5">
                <h3 className="text-sm font-bold text-gcl-pink-600 mb-3">Your Candy Selection</h3>
                <div className="flex flex-wrap gap-2">
                  {selections.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 border border-gcl-pink-200"
                    >
                      {c}
                      <button onClick={() => toggleCandy(c)} className="text-gray-400 hover:text-gcl-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
              <div>
                <p className="text-sm text-gray-500">{currentProduct.name}</p>
                <p className="text-2xl font-bold text-gcl-pink-600">{formatPrice(currentProduct.price_cents)}</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={selections.length === 0}
                className="btn-primary w-full sm:w-auto"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart & Checkout
              </button>
            </div>
          </div>
        )}

        {!selectedSize && !loading && (
          <div className="text-center py-16">
            <CandyIcon className="h-12 w-12 text-gcl-pink-200 mx-auto mb-4" />
            <p className="text-gray-500">Select a size above to start choosing your candies!</p>
          </div>
        )}
      </div>
    </div>
  );
}
