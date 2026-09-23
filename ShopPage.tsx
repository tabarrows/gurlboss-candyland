import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    (async () => {
      const [{ data: prods }, { data: cats }] = await Promise.all([
        supabase.from('products').select('*, category:categories(*)').eq('is_visible', true).order('sort_order'),
        supabase.from('categories').select('*').order('sort_order'),
      ]);
      if (prods) setProducts(prods as Product[]);
      if (cats) setCategories(cats as Category[]);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCat !== 'all') {
      result = result.filter((p) => p.category_id === activeCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => (a.price_cents ?? 0) - (b.price_cents ?? 0));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => (b.price_cents ?? 0) - (a.price_cents ?? 0));
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [products, activeCat, search, sortBy]);

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-gcl-pink-50 to-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl text-gcl-pink-600 mb-2">Shop All Candy</h1>
          <p className="text-sm text-gray-500">Browse our full selection of sweet treats</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="default">Sort: Default</option>
            <option value="name">Name A-Z</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCat('all')}
            className={`badge px-4 py-2 text-sm transition-all ${
              activeCat === 'all'
                ? 'bg-gcl-pink-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gcl-pink-300'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`badge px-4 py-2 text-sm transition-all ${
                activeCat === cat.id
                  ? 'bg-gcl-pink-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gcl-pink-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} categoryName={p.category?.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
