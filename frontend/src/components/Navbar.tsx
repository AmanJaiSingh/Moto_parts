'use client';
import Link from 'next/link';
import { ShoppingCart, User, Wrench, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const { showToast } = useToastStore();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    showToast('Logged out successfully');
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Wrench className="h-6 w-6 text-red-600" />
          <span>Moto<span className="text-red-600">Parts</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
            All Parts
          </Link>
          <Link href="/categories" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
            Categories
          </Link>
          <Link href="/brands" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
            Brands
          </Link>
          {userInfo && (
            <Link href="/orders" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
              My Orders
            </Link>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {userInfo ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium hidden sm:inline">Hi, {userInfo.name.split(' ')[0]}</span>
              <button 
                onClick={handleLogout} 
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
          
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
