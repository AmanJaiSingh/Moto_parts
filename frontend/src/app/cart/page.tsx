'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotal } = useCartStore();
  const { userInfo } = useAuthStore();

  return (
    <div className="flex flex-col gap-8 pb-12">
      <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-lg text-zinc-500 mb-6">Your cart is currently empty.</p>
          <Link href="/products" className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="font-bold mt-1 text-lg">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-zinc-500 mt-1">Qty: {item.qty}</p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-zinc-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-6 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-fit sticky top-24">
            <h2 className="text-xl font-bold border-b border-zinc-100 dark:border-zinc-800 pb-4">Order Summary</h2>
            <div className="flex justify-between items-center text-lg">
              <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
              <span className="font-bold">${cartTotal().toFixed(2)}</span>
            </div>
            {userInfo ? (
              <Link href="/checkout" className="w-full text-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-black/80 dark:hover:bg-zinc-200 transition-colors">
                Proceed to Checkout
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-red-600 font-medium">Please sign in to complete your checkout.</p>
                <Link href="/login?redirect=/checkout" className="w-full text-center px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                  Sign In to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
