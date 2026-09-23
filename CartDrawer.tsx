import { useCart } from '@/lib/cart-context';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/types';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gcl-pink-500" />
            <h2 className="text-lg font-bold text-gray-900">Your Cart ({itemCount})</h2>
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gcl-pink-50 mb-4">
              <ShoppingBag className="h-10 w-10 text-gcl-pink-300" />
            </div>
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add some sweet treats to get started!</p>
            <Link to="/shop" onClick={closeCart} className="btn-primary mt-6">
              Browse Candy
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3 rounded-xl border border-gray-100 p-3 bg-white">
                  <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-gcl-pink-50">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.product_name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gcl-pink-300 text-xs">No img</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.product_name}</p>
                    {item.size_label && (
                      <p className="text-xs text-gray-500">Size: {item.size_label}</p>
                    )}
                    {item.candy_selections.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.candy_selections.map((c, i) => (
                          <span key={i} className="badge bg-gcl-pink-50 text-gcl-pink-600 text-[10px]">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gcl-pink-600">
                          {formatPrice(item.price_cents * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gcl-red-50 hover:text-gcl-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-400">Delivery calculated at checkout.</p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-primary w-full"
              >
                Checkout
              </Link>
              <button onClick={closeCart} className="btn-secondary w-full">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
