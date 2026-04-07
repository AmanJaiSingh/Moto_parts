import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Settings, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900 text-white shadow-xl isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black opacity-80"></div>
        <div className="px-8 flex flex-col justify-center min-h-[400px] max-w-2xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Precision Parts.<br />
            <span className="text-red-500">Peak Performance.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-lg">
            High-quality, durable spare parts for all major bike brands. Keep your ride running smooth with our certified components.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all">
              Shop All Parts
            </Link>
            <Link href="/categories" className="inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex-shrink-0 p-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">OEM Certified</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">All parts meet or exceed original equipment manufacturer standards.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex-shrink-0 p-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-xl">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Perfect Fit</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Guaranteed compatibility with your specific make and model.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex-shrink-0 p-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-xl">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Fast Shipping</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Express delivery nationwide to get you back on the road faster.</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-2xl font-bold tracking-tight">Popular Categories</h2>
          <Link href="/categories" className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center gap-1 group">
            View All <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[
            { name: "Engine Parts", count: 124, src: "https://images.unsplash.com/photo-1590204781745-f04b2b6ab0c9?q=80&w=600&auto=format&fit=crop" },
            { name: "Braking System", count: 86, src: "https://images.unsplash.com/photo-1577717903901-b21a36b9c968?q=80&w=600&auto=format&fit=crop" },
            { name: "Electrical & Lights", count: 52, src: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop" },
            { name: "Performance Exhausts", count: 31, src: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=600&auto=format&fit=crop" }
          ].map((cat) => (
            <Link key={cat.name} href={`/categories/${cat.name.toLowerCase().replace(/ & /g, '-').replace(' ', '-')}`} 
              className="group relative h-48 md:h-64 rounded-2xl overflow-hidden bg-zinc-100 flex flex-col justify-end p-4 sm:p-6 border border-zinc-200 dark:border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <Image 
                src={cat.src} 
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative z-20">
                <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-red-400 transition-colors">{cat.name}</h3>
                <p className="text-sm text-zinc-300">{cat.count} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
    </div>
  );
}
