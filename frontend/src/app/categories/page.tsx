import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Categories - MotoParts',
};

const categoriesData = [
  { name: 'Braking System', items: 124, img: 'https://images.unsplash.com/photo-1577717903901-b21a36b9c968?q=80&w=600&auto=format&fit=crop' },
  { name: 'Engine Parts', items: 342, img: 'https://images.unsplash.com/photo-1610640498870-fb0b5b08ce2a?q=80&w=600&auto=format&fit=crop' },
  { name: 'Transmission', items: 89, img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop' },
  { name: 'Electrical & Lights', items: 210, img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=600&auto=format&fit=crop' },
  { name: 'Exhaust', items: 45, img: 'https://images.unsplash.com/photo-1590204781745-f04b2b6ab0c9?q=80&w=600&auto=format&fit=crop' },
  { name: 'Suspension', items: 67, img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop' }
];

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Shop by Category</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Find exactly what you are looking for by browsing our specialized departments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <Link key={category.name} href={`/products`} className="group relative h-64 w-full overflow-hidden rounded-2xl bg-black border border-zinc-200 dark:border-zinc-800 flex items-end p-6">
             <Image 
                src={category.img} 
                alt={category.name}
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
              />
              <div className="relative z-10 w-full flex justify-between items-center text-white">
                 <div>
                    <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
                    <p className="text-zinc-300 text-sm mt-1">{category.items} Products</p>
                 </div>
                 <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold group-hover:bg-red-600 transition-colors">
                    →
                 </div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
