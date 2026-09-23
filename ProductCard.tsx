import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatPrice, type Product } from '@/lib/types';
import { Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export default function ProductCard({ product, categoryName }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (product.is_sold_out) return;
    if (product.product_type === 'pickmix' || product.product_type === 'gbf') return;

    addItem({
      key: `${product.id}-${Date.now()}`,
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      product_type: product.product_type,
      price_cents: product.price_cents ?? 0,
      quantity: 1,
      size_label: product.size_label,
      image_url: product.image_url,
      candy_selections: [],
      max_candy_choices: null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isCustomizable = product.product_type === 'pickmix' || product.product_type === 'gbf';
  const linkTo = product.product_type === 'pickmix' ? '/pick-and-mix' : product.product_type === 'gbf' ? '/gurlboss-fave' : `/shop/${product.slug}`;

  return (
    <div className="card group relative flex flex-col">
      {product.is_featured && !product.is_sold_out && (
        <div className="absolute top-3 left-3 z-10 badge bg-gcl-pink-500 text-white shadow-md">
          Featured
        </div>
      )}
      {product.is_sold_out && (
        <div className="absolute top-3 right-3 z-10 badge bg-gray-800 text-white shadow-md">
          Sold Out
        </div>
      )}

      <Link to={linkTo} className="block relative overflow-hidden aspect-square bg-gcl-pink-50">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gcl-pink-100 to-gcl-pink-200">
            <span className="text-gcl-pink-400 text-sm font-medium">Image coming soon</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {categoryName && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gcl-pink-400 mb-1">
            {categoryName}
          </span>
        )}
        <Link to={linkTo}>
          <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 hover:text-gcl-pink-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gcl-pink-600">
            {formatPrice(product.price_cents)}
          </span>
          {isCustomizable ? (
            <Link to={linkTo} className="btn-primary !px-4 !py-2 !text-xs">
              Customize
            </Link>
          ) : product.is_sold_out ? (
            <span className="badge bg-gray-100 text-gray-400 px-4 py-2">Sold Out</span>
          ) : (
            <button
              onClick={handleAdd}
              disabled={product.is_sold_out}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-90 ${
                added ? 'bg-green-500 text-white' : 'bg-gcl-pink-500 text-white hover:bg-gcl-pink-600 shadow-md'
              }`}
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
