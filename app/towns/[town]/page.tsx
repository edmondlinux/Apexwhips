import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, MapPin, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import towns from '@/data/towns.json';

interface Props {
  params: Promise<{ town: string }>;
}

export default async function TownPage({ params }: Props) {
  const { town } = await params;
  const townData = towns.find((t) => t.id.toLowerCase() === town.toLowerCase());

  if (!townData) {
    notFound();
  }

  const products = [
    {
      id: 'single',
      name: 'SmartWhip (Single)',
      description: 'Single high-performance smart canister.',
      price: '£30',
      features: ['Immediate Delivery', 'Premium Quality']
    },
    {
      id: 'case',
      name: 'SmartWhip (Case)',
      description: 'Bulk case for maximum value.',
      price: '£130',
      features: ['Best Price', 'Bulk Savings']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-orange-500 mr-2 transition-colors" />
            <Zap className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 uppercase">ApexWhips</span>
          </Link>
          <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            <span className="font-bold text-sm uppercase">{townData.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Order in {townData.name}
          </h1>
          <p className="text-xl text-gray-600">
            Choose your package and message us on WhatsApp or Telegram to complete your order for delivery in {townData.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-xl bg-white rounded-3xl">
              <CardHeader className="bg-orange-500 text-white p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-3xl font-black italic uppercase tracking-tighter">{product.name}</CardTitle>
                    <p className="text-orange-100 mt-1 font-medium">{product.description}</p>
                  </div>
                  <div className="text-4xl font-black">{product.price}</div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">Select Platform to Order</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white py-8 rounded-2xl text-lg font-bold shadow-lg">
                        <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-6 w-6 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                      <Button asChild className="bg-[#0088cc] hover:bg-[#0077b5] text-white py-8 rounded-2xl text-lg font-bold shadow-lg">
                        <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer">
                          <Send className="h-6 w-6 mr-2" />
                          Telegram
                        </a>
                      </Button>
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-4">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600 font-medium bg-gray-50 p-3 rounded-xl">
                        <Zap className="h-4 w-4 text-orange-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium italic">
            "Simple, fast, and secure. We handle all {townData.name} deliveries personally."
          </p>
        </div>
      </main>
    </div>
  );
}
