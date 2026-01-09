import { Button } from '@/components/ui/button';
import { CircleIcon, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight uppercase">ApexWhips</span>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium">Home</Link>
            <Link href="/towns/london" className="text-gray-600 hover:text-orange-500 font-medium">London</Link>
            <Link href="/towns/manchester" className="text-gray-600 hover:text-orange-500 font-medium">Manchester</Link>
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-linear-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl md:text-7xl">
              Next-Gen <span className="text-orange-500">SmartWhips</span> for the UK
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Premium automotive accessories and smart integration for your vehicle. Available across major UK towns.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/towns/london">
                <Button size="lg" className="w-full sm:w-auto rounded-full bg-orange-500 hover:bg-orange-600 text-lg px-8">
                  Shop in London
                </Button>
              </Link>
              <Link href="/towns/manchester">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-lg px-8">
                  Shop in Manchester
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
                <Zap className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Next-day delivery across the UK for all SmartWhip models.</p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
                <CircleIcon className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Full Integration</h3>
                <p className="text-gray-600">Seamlessly connects with your existing vehicle systems.</p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
                < Zap className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Expert Support</h3>
                <p className="text-gray-600">Local technicians in every major UK town ready to assist.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Zap className="h-5 w-5 text-orange-500" />
              <span className="ml-2 text-lg font-bold text-gray-900 uppercase">ApexWhips</span>
            </div>
            <p className="text-gray-500">© 2026 ApexWhips.com. Delivering smart solutions across the UK.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
