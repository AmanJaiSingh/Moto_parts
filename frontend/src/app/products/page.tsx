import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

export const metadata = {
  title: 'All Products - MotoParts',
  description: 'Browse our extensive catalog of high-quality bike spare parts.',
};

// Next.js 15: async Server Component
export default async function ProductsPage() {
  let products = [];
  try {
    const res = await fetch('http://localhost:5000/api/products', {
      cache: 'no-store', // Always fetch fresh
    });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  // Fallback to mock data if backend isn't running
  if (!products.length) {
    const categoriesData = [
      { name: 'Braking System', img: 'https://images.unsplash.com/photo-1577717903901-b21a36b9c968?q=80&w=600&auto=format&fit=crop' },
      { name: 'Engine Parts', img: 'https://images.unsplash.com/photo-1610640498870-fb0b5b08ce2a?q=80&w=600&auto=format&fit=crop' },
      { name: 'Transmission', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop' },
      { name: 'Electrical & Lights', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=600&auto=format&fit=crop' },
      { name: 'Exhaust', img: 'https://images.unsplash.com/photo-1590204781745-f04b2b6ab0c9?q=80&w=600&auto=format&fit=crop' },
      { name: 'Suspension', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop' }
    ];
    
    const brands = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Ducati', 'BMW', 'Universal'];
    
    for (let i = 0; i < 60; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const category = categoriesData[Math.floor(Math.random() * categoriesData.length)];
        products.push({
            _id: `mock-${i}`,
            name: `${brand} Compatible ${category.name} Module V${(Math.random() * 10).toFixed(1)}`,
            price: Number((Math.random() * 150 + 10).toFixed(2)),
            category: category.name,
            imageUrl: category.img,
        });
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">All Replacement Parts</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Everything you need to keep your bike in perfect condition.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: any) => (
          <div key={product._id} className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 overflow-hidden dark:border-zinc-800 dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md">
            <Link href={`/products/${product._id}`} className="block h-48 w-full overflow-hidden rounded-xl mb-4 bg-zinc-100 dark:bg-zinc-800 relative">
              <Image 
                src={product.imageUrl} 
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            
            <div className="flex flex-col flex-1 justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-red-600 mb-1">{product.category}</p>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                  <Link href={`/products/${product._id}`} className="hover:text-red-600 transition-colors">
                    {product.name}
                  </Link>
                </h3>
              </div>
              
              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
