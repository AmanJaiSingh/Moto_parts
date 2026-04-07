'use client';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const { userInfo } = useAuthStore();
  const { cartItems, cartTotal } = useCartStore();
  const { showToast } = useToastStore();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Protect Route - user is logged in
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo, router]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const res = await fetch('http://localhost:5000/api/payment/save-order', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userInfo?.token}`
         },
         body: JSON.stringify({
           orderItems: cartItems.map(i => ({ 
             name: i.name, 
             qty: i.qty, 
             image: i.imageUrl, 
             price: i.price, 
             product: i._id 
           })),
           shippingAddress: { address, city, postalCode, country },
           paymentMethod: 'Cash/Bypass',
           itemsPrice: cartTotal(),
           taxPrice: 0,
           shippingPrice: 0,
           totalPrice: cartTotal(),
           paymentResult: { id: 'mock_transaction_123', status: 'paid', email_address: userInfo?.email },
           user: userInfo?._id
         })
       });

       if(res.ok) {
         useCartStore.getState().clearCart();
         showToast('Order Placed Successfully! Your items will be shipped soon.');
         router.push('/orders');
       } else {
         showToast('Error placing order', 'error');
       }
    } catch(err) {
       showToast('Network Error', 'error');
    }
  };

  if (!userInfo) return null;

  return (
    <div className="flex flex-col items-center pb-12">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Shipping Address</h1>
        
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Street Address</label>
            <input 
              type="text" 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
              placeholder="123 Main St"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input 
                type="text" 
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
                placeholder="New York"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input 
                type="text" 
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
                placeholder="10001"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input 
              type="text" 
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
              placeholder="USA"
            />
          </div>
          
          <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex items-center justify-between">
             <div className="text-zinc-600 dark:text-zinc-400">Total to pay: <span className="text-black dark:text-white font-bold text-xl ml-2">${cartTotal().toFixed(2)}</span></div>
             <button type="submit" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg">
                Continue to Payment
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
