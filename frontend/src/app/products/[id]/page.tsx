import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

// Next.js 15 Async Server Component
export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  // We need to await params in Next.js 15
  const unwrappedParams = await params;
  const productId = unwrappedParams.id;
  
  let product = null;

  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
      cache: 'no-store'
    });
    
    if (res.ok) {
      product = await res.json();
    }
  } catch(err) {
    console.error("Failed to fetch product details", err);
  }

  // Fallback for mock data (if backend fails/missing)
  if (!product && productId.startsWith('mock-')) {
    product = {
      _id: productId,
      name: 'Mock Product V' + (Math.random() * 10).toFixed(1),
      price: Number((Math.random() * 150 + 10).toFixed(2)),
      description: 'This is a premium high-performance part designed perfectly to fit standard OEM mounting points. Ensures long lasting durability.',
      category: 'Replacement Parts',
      bikeBrand: 'Universal',
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop',
      stockCount: 15
    };
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-12 pb-12 pt-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-black dark:hover:text-white">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-black dark:text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery Mock */}
        <div className="relative h-[60vh] w-full bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <Image 
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
               {product.bikeBrand && (
                 <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 text-xs font-bold rounded-full">
                    {product.bikeBrand}
                 </span>
               )}
               <span className="text-sm font-semibold text-zinc-500">{product.category}</span>
             </div>
             
             <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{product.name}</h1>
             <p className="text-3xl font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-8">
               ${product.price.toFixed(2)}
             </p>
          </div>

          <div className="flex flex-col gap-4">
             <h3 className="text-lg font-semibold">Description</h3>
             <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
               {product.description || "Premium certified replacement component engineered to exceed OEM specifications for fit and performance."}
             </p>
          </div>

          <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-between mt-auto">
             <div className="flex flex-col gap-1">
                <span className={`text-sm font-bold ${product.stockCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="text-xs text-zinc-500">{product.stockCount} units available</span>
             </div>
             <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
