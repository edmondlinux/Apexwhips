import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, MapPin, ShoppingCart, ArrowLeft } from 'lucide-react';
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
      id: 1,
      name: 'SmartWhip Pro X',
      description: 'The ultimate smart integration for performance vehicles.',
      price: '£299.99',
      features: ['Bluetooth 5.0', 'Voice Control', 'App Sync']
    },
    {
      id: 2,
      name: 'SmartWhip Lite',
      description: 'Compact and efficient smart solution for everyday cars.',
      price: '£149.99',
      features: ['Easy Install', 'Basic Voice', 'Touch Controls']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-orange-500 mr-2 transition-colors" />
            <Zap className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 uppercase">ApexWhips</span>
          </Link>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 text-orange-500 mr-2" />
            <span className="font-medium">{townData.name}, UK</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            SmartWhips for Sale in {townData.name}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Premium smart automotive tech available for immediate delivery in {townData.name} and surrounding areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow bg-white rounded-2xl">
              <CardHeader className="bg-orange-50 border-b border-orange-100">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{product.name}</span>
                  <span className="text-orange-600 font-bold">{product.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-6">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-500">
                      <Zap className="h-4 w-4 text-orange-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-gray-50 pt-6">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl py-6 text-lg font-bold">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Order for {townData.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mt-16 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Local {townData.name} Installation</h2>
            <p className="text-gray-600 mb-6">
              Every SmartWhip purchased in {townData.name} comes with the option of professional local installation. 
              Our technicians are based right here in {townData.name}, ensuring you get the best service without the wait.
            </p>
            <Button variant="outline" className="rounded-full px-8">
              Learn about local installation
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2026 ApexWhips.com. Your local SmartWhip experts in {townData.name}.</p>
        </div>
      </footer>
    </div>
  );
}
