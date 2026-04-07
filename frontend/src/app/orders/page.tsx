'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Clock, CheckCircle, ChevronRight } from 'lucide-react';

export default function OrdersPage() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/payment/my-orders/${userInfo._id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-zinc-500 dark:text-zinc-400">View and track your previous bike part purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
          <Package className="h-12 w-12 text-zinc-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders found</h2>
          <p className="text-zinc-500 mb-6">You haven't placed any orders yet.</p>
          <button 
            onClick={() => router.push('/products')}
            className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-800/30">
                <div className="flex flex-wrap gap-8 items-center">
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-400 mb-1">Order Placed</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-400 mb-1">Total Amount</p>
                    <p className="font-bold text-red-600">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-400 mb-1">Order ID</p>
                    <p className="font-medium text-zinc-500">#{order._id.substring(0, 10).toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                   <CheckCircle className="h-3 w-3" />
                   {order.isPaid ? 'PAID' : 'PENDING'}
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-4">
                  {order.orderItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-zinc-500">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                      </div>
                      <Link href={`/products/${item.product}`} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <ChevronRight className="h-5 w-5 text-zinc-400" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
