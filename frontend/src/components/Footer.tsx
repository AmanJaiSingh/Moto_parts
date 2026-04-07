import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight mb-4">
            <Wrench className="h-6 w-6 text-red-600" />
            <span>Moto<span className="text-red-600">Parts</span></span>
          </Link>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            High-quality bike spare parts delivered straight to your door. Built for riders, by riders.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4 text-black dark:text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">All Parts</Link></li>
            <li><Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4 text-black dark:text-white">Top Categories</h3>
          <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><Link href="/categories/engine" className="hover:text-black dark:hover:text-white transition-colors">Engine Components</Link></li>
            <li><Link href="/categories/brakes" className="hover:text-black dark:hover:text-white transition-colors">Brake Pads & Rotors</Link></li>
            <li><Link href="/categories/filters" className="hover:text-black dark:hover:text-white transition-colors">Oil & Air Filters</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4 text-black dark:text-white">Customer Support</h3>
          <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>support@motoparts.com</li>
            <li>1-800-MOTOR-PT</li>
            <li>Mon - Fri, 9am - 6pm EST</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">© 2026 MotoParts. All rights reserved.</p>
        <div className="flex gap-4 text-sm text-zinc-500">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-black dark:hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
