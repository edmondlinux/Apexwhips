import { Button } from '@/components/ui/button';
import { CircleIcon, Truck, Zap, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">Apexwhips.com</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#products" className="text-sm font-medium text-gray-700 hover:text-blue-600">Products</a>
            <a href="#delivery" className="text-sm font-medium text-gray-700 hover:text-blue-600">Delivery</a>
            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Shop Now
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-50 py-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Truck className="h-4 w-4 mr-2" />
              Next Day Delivery Across UK
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
              Premium Smartwhips <br />
              <span className="text-blue-600">Delivered Fast</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The UK's most reliable supplier of Smartwhip cream chargers. 
              Top quality, best prices, and lightning-fast shipping right to your door.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Order Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl text-lg px-8">
                View Price List
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="delivery" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-blue-50 text-blue-600 mb-6">
                  <Truck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fast UK Shipping</h3>
                <p className="text-gray-600">Order before 4 PM for next-day delivery to any UK address.</p>
              </div>
              <div>
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-blue-50 text-blue-600 mb-6">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Quality</h3>
                <p className="text-gray-600">100% genuine Smartwhip products, safety tested and certified.</p>
              </div>
              <div>
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-blue-50 text-blue-600 mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bulk Discounts</h3>
                <p className="text-gray-600">Save more when you stock up. Wholesale prices available on request.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Teaser */}
        <section id="products" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-4 text-gray-600">Browse our selection of premium cream chargers.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product Card Placeholder */}
              {[
                { name: 'Smartwhip Silver (640g)', price: '£24.99' },
                { name: 'Smartwhip Gold (640g)', price: '£29.99' },
                { name: 'Masterwhip (640g)', price: '£22.99' },
              ].map((product, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-400">Product Image</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                    <p className="text-blue-600 font-bold mt-2 text-xl">{product.price}</p>
                    <Button className="w-full mt-6 bg-gray-900 hover:bg-black rounded-xl">Add to Basket</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Zap className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-xl font-bold tracking-tight">Apexwhips.com</span>
              </div>
              <p className="text-gray-400 text-sm">
                The premier online shop for Smartwhips in the UK. 
                Quality products with ultra-fast delivery.
              </p>
            </div>
            {/* Additional footer columns can be added here */}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2026 Apexwhips.com. All rights reserved. Must be 18+ to purchase.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
