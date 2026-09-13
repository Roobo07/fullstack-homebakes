import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium">
          <Sparkles className="w-4 h-4" /> Freshly Baked & Handcrafted Daily
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          Welcome to <span className="text-amber-600 dark:text-amber-500">HomeBakes</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl">
          Discover artisan cakes, custom pastries, and gourmet treats delivered fresh from our kitchen straight to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
          >
            <ShoppingBag className="w-5 h-5" /> Browse Shop <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/custom-cake"
            className="flex items-center justify-center h-12 px-8 rounded-full border border-zinc-300 dark:border-zinc-800 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Order Custom Cake
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">100% Artisan Quality</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Baked from scratch using premium, locally-sourced organic ingredients.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Same-Day Delivery</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Fast and temperature-controlled delivery to keep your treats fresh.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Secure Checkout</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Protected payment processing and seamless account management.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
