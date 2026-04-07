'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { setUserInfo } = useAuthStore();
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUserInfo(data);
        router.push('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Network error connecting to backend');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
              placeholder="Confirm password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full mt-2 py-2.5 rounded-lg bg-black hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white font-medium transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link href="/login" className="text-red-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
