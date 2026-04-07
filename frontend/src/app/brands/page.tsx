import Link from 'next/link';

export const metadata = {
  title: 'Brands - MotoParts',
};

const brandsData = [
  { name: 'Yamaha', items: 154 },
  { name: 'Honda', items: 132 },
  { name: 'Kawasaki', items: 89 },
  { name: 'Suzuki', items: 110 },
  { name: 'Ducati', items: 45 },
  { name: 'BMW', items: 67 },
  { name: 'Universal', items: 231 }
];

export default function BrandsPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Shop by Brand</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Select your motorcycle brand to find OEM requested components.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brandsData.map((brand) => (
          <Link key={brand.name} href={`/products`} className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-red-600 dark:hover:border-red-600 transition-colors shadow-sm hover:shadow-md">
             <div className="text-3xl font-bold text-zinc-300 dark:text-zinc-700 group-hover:text-red-500 transition-colors mb-2">
                {brand.name.toUpperCase()}
             </div>
             <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{brand.items} Parts Available</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
