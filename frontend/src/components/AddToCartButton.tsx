'use client';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';

export default function AddToCartButton({ product }: { product: any }) {
  const { cartItems, addToCart, decrementFromCart } = useCartStore();
  const { showToast } = useToastStore();

  const itemInCart = cartItems.find((item) => item._id === product._id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      qty: 1,
      stockCount: product.stockCount || 10,
    });
    showToast(`Added ${product.name} to cart`);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    decrementFromCart(product._id);
    showToast(`Removed 1 ${product.name} from cart`);
  };

  if (itemInCart) {
    return (
      <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-1 border border-zinc-200 dark:border-zinc-700">
        <button 
          onClick={handleDecrement}
          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-zinc-600 dark:text-zinc-400 hover:text-red-600 rounded-full transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="text-sm font-bold min-w-[20px] text-center">
          {itemInCart.qty}
        </span>
        <button 
          onClick={handleAdd}
          className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 text-zinc-600 dark:text-zinc-400 hover:text-green-600 rounded-full transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleAdd}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-black hover:text-white transition-colors dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-red-600 dark:hover:text-white"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Add to cart</span>
    </button>
  );
}
