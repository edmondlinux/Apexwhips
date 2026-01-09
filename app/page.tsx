import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShoppingCart, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const products = [
    {
      id: 'single',
      name: 'Single SmartWhip',
      price: '£30',
      description: 'The standard premium smart canister for individual use.',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000&auto=format&fit=crop', // Placeholder automotive tech
      link: '/towns/london'
    },
    {
      id: 'case',
      name: 'SmartWhip Case (Bulk)',
      price: '£130',
      description: 'Bulk pack case for heavy users. Best value for money.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop', // Placeholder sleek car parts
      link: '/towns/london'
    }
  ];

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
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-linear-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
              Premium <span className="text-orange-500">SmartWhips</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              The UK's leading supplier of high-performance SmartWhips. Available for local delivery in your town.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl group">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-lg shadow-sm">
                      {product.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="mt-4 text-sm font-semibold text-orange-600 uppercase tracking-wider">Available across UK</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={product.link} className="w-full">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-6 text-lg font-bold shadow-orange-200 shadow-lg">
                        Checkout
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Fast Delivery to Your Town</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center">
                <MessageCircle className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">WhatsApp Order</h3>
                <p className="text-gray-600">Quick and easy ordering via WhatsApp message.</p>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center">
                <Send className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Telegram Fast-Track</h3>
                <p className="text-gray-600">Secure and private ordering through Telegram.</p>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center">
                <Zap className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Local Delivery</h3>
                <p className="text-gray-600">We deliver directly to your door in London, Manchester & more.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <Zap className="h-5 w-5 text-orange-500" />
            <span className="ml-2 text-lg font-bold text-gray-900 uppercase">ApexWhips</span>
          </div>
          <p className="text-gray-500">© 2026 ApexWhips.com. No automated checkout - Personal service via WhatsApp & Telegram.</p>
        </div>
      </footer>
    </div>
  );
}
