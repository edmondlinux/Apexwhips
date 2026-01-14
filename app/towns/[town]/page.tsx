import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, MapPin, MessageCircle, Send, ArrowLeft, ShieldCheck, Truck, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import gbData from '@/data/gb.json';

interface Props {
  params: Promise<{ town: string }>;
}

export async function generateStaticParams() {
  return gbData.map((town) => ({
    town: town.city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { town } = await params;
  const townData = gbData.find(
    (t) => t.city.toLowerCase().replace(/\s+/g, '-') === town.toLowerCase()
  );

  if (!townData) return { title: 'Town Not Found' };

  const cityName = townData.city;
  const baseUrl = process.env.BASE_URL || 'https://www.apexwhips.com';
  
  return {
    title: `Buy SmartWhip ${cityName} | Fast 640g,2kg Cream Charger Delivery in ${cityName}`,
    description: `Buy genuine Smartwhip, Fastgas, Cream delux 640g canisters in ${cityName}. Fast 25 min delivery across ${cityName} for cream chargers, FastGas & Cream Deluxe. Best UK prices guaranteed.`,
    alternates: {
      canonical: `/towns/${town}`,
    },
    keywords: [
      `Smartwhip ${cityName}`,
      `buy Smartwhip ${cityName}`,
      `Smartwhip delivery ${cityName}`,
      `640g cream chargers ${cityName}`,
      `FastGas ${cityName}`,
      `Cream Deluxe ${cityName}`,
      `N2O cylinders ${cityName}`,
      `Smartwhip wholesale ${cityName}`,
      `smart whip ${cityName}`,
      `smartwhip Near ${cityName}`
    ],
    openGraph: {
      title: `Smartwhip in ${cityName} | Apexwhips.com`,
      description: `Fast delivery of Smartwhip, Flake,Cocaine, and Fastgas in ${cityName}.`,
      images: ['/og_image/og_image.jpeg'],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og_image/og_image.jpeg'],
    }
  };
}

export default async function TownPage({ params }: Props) {
  const { town } = await params;
  
  const townData = gbData.find(
    (t) => t.city.toLowerCase().replace(/\s+/g, '-') === town.toLowerCase()
  );

  if (!townData) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `SmartWhip 640g Cylinder - ${townData.city} Delivery`,
    'description': `Premium 640g Smartwhip, Fastgas, Cream delux nitrous oxide cream charger canister, N2O delivery in ${townData.city}.`,
    'image': `${process.env.BASE_URL || 'https://www.apexwhips.com'}/og_image/og_image.jpeg`,
    'brand': {
      '@type': 'Brand',
      'name': 'Smartwhip'
    },
    'offers': {
      '@type': 'Offer',
      'url': `${process.env.BASE_URL || 'https://apexwhips.com'}/towns/${town}`,
      'priceCurrency': 'GBP',
      'price': '30.00',
      'availability': 'https://schema.org/InStock',
      'areaServed': {
        '@type': 'City',
        'name': townData.city
      }
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `How fast is SmartWhip delivery in ${townData.city}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `We offer rapid local delivery of smartwhip, Fastgas, Flake in ${townData.city}, with most orders delivered within 25-45 minutes.`
        }
      },
      {
        '@type': 'Question',
        'name': `Is the Smartwhip food-grade?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': "Yes, all our Smartwhip canisters contain 99.9% pure food-grade Nitrous Oxide (N2O)."
        }
      }
    ]
  };

  const products = [
    {
      id: 'single',
      name: 'Smartwhip 640g, 2kg',
      subtitle: 'Premium N2O Canister',
      description: `The industry leading 640g Smartwhip c. Provides consistent pressure and high-purity N2O gas, Fast delivery in ${townData.city}.`,
      price: '£30',
      tag: 'Best Seller'
    },
    {
      id: 'case',
      name: 'Smartwhip Case (6x)',
      subtitle: 'Wholesale Bulk Pack',
      description: `Stock up with our 6-unit master case. The most cost-effective way to buy Smartwhip in ${townData.admin_name} for large events or business use.`,
      price: '£130',
      tag: 'Best Value'
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <div className="bg-gray-100 p-2 rounded-xl group-hover:bg-orange-500 transition-colors duration-300">
              <ArrowLeft className="h-5 w-5 text-gray-500 group-hover:text-white" />
            </div>
            <div className="flex items-center ml-4">
              <Zap className="h-6 w-6 text-orange-500" />
              <span className="ml-2 text-xl font-black text-gray-900 uppercase tracking-tighter italic">ApexWhips</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-2xl shadow-xl shadow-gray-200">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest">{townData.city}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative mb-20">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-100 blur-[100px] rounded-full -z-10 opacity-50" />
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
              <div className="mb-8">
                <Image 
                  src="/logo/logo.jpeg" 
                  alt="ApexWhips Logo" 
                  width={120} 
                  height={120} 
                  className="rounded-2xl shadow-xl"
                />
              </div>
              SMARTWHIP IN <br />
              <span className="text-orange-500 italic">{townData.city.toUpperCase()}</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Premium Smartwhips,Crake,Flake available for immediate delivery across {townData.city} ({townData.admin_name}). 
              With a local population of {Number(townData.population).toLocaleString()}, we maintain high stock levels for rapid drops.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[3rem] group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image 
                  src="/IMG_1867.jpeg" 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
                <div className="absolute top-8 left-8">
                  <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                    {product.tag}
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white">
                  <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{product.name}</h2>
                    <p className="text-orange-200 font-bold uppercase tracking-widest text-[10px] mt-2">{product.subtitle}</p>
                  </div>
                  <div className="text-5xl font-black tracking-tighter">{product.price}</div>
                </div>
              </div>

              <CardContent className="p-10">
                <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">
                  {product.description}
                </p>

                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-grow bg-gray-200" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Direct Dispatch Access</span>
                    <div className="h-px flex-grow bg-gray-200" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <a 
                      href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "#"}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-green-100"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
                    </a>
                      <a
                        href={process.env.NEXT_PUBLIC_TELEGRAM_URL || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white py-6 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-100"
                      >
                      <Send className="h-5 w-5" />
                      Telegram
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Dynamic Content Section */}
        <section className="bg-gray-50 rounded-[3rem] p-12 md:p-20 mb-20 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-6">
                Serving {townData.city} & {townData.admin_name}
              </h2>
              <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                <p>
                  ApexWhips is proud to be the leading supplier of premium  smartwhips in the {townData.admin_name} region. 
                  Our strategic location at {townData.lat}, {townData.lng} allows us to reach any part of {townData.city} within minutes of dispatch.
                </p>
                <p>
                  Whether you are in the heart of {townData.city} or the surrounding areas, our dedicated local team ensures 
                  that your SmartWhip or Case arrives securely and discreetly. We understand the specific needs of the 
                  {townData.city}  community and tailor our local stock to match.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-orange-500 mb-1 leading-none">{Number(townData.population).toLocaleString()}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Local Population</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-gray-900 mb-1 leading-none">24/7</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Hours</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-gray-900 mb-1 leading-none">UK</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ISO {townData.iso2} Standard</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-orange-500 mb-1 leading-none">PRO</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Tech</div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Truck, title: "Rapid Dispatch", text: `Get your SmartWhip delivered in ${townData.city} within 25-45 minutes. Our local courier network ensures the fastest arrival for culinary supplies.` },
            { icon: ShieldCheck, title: "Premium Quality", text: "We only stock 100% genuine SmartWhip cylinders containing high-purity, food-grade Nitrous Oxide for culinary use." },
            { icon: Clock, title: "24/7 Availability", text: `Need cream chargers late at night? Our ${townData.city} hub operates 24/7 to fulfill your professional catering needs anytime.` }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <item.icon className="h-8 w-8 text-orange-500 mb-6" />
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">{item.title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic mb-6">Premium SmartWhip Suppliers</h2>
                <div className="prose prose-orange text-gray-600 font-medium">
                  <p className="mb-4">SmartWhip has revolutionized the catering industry with its high-capacity 640g cylinders. Designed for efficiency and consistent pressure, it is the preferred choice for cafes, restaurants, and professional kitchens in {townData.city}.</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>99.9% Pure Food-Grade Nitrous Oxide (N2O)</li>
                    <li>Compatible with all standard pressure regulators</li>
                    <li>Equal to 80+ individual 8g cream chargers</li>
                    <li>TUV Certified and quality tested</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-4">FastGas & Cream Deluxe Delivery</h3>
                <p className="text-gray-600 mb-6">Looking for alternatives? We also stock FastGas and Cream Deluxe 640g cylinders. Our local {townData.city} hub ensures you never run out of supplies during peak hours. Available for both wholesale and retail orders.</p>
                <div className="flex gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                    <span className="block text-2xl font-black text-orange-500">640g</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Stock</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                    <span className="block text-2xl font-black text-orange-500">24/7</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
              <h3 className="font-black uppercase tracking-tight text-gray-900 mb-4 text-lg">How do I order SmartWhip in {townData.city}?</h3>
              <p className="text-gray-500 font-medium">Ordering is simple. Click the WhatsApp or Telegram buttons to connect directly with our dispatch team. Provide your location in {townData.city} and we will handle the rest.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
              <h3 className="font-black uppercase tracking-tight text-gray-900 mb-4 text-lg">What brands do you stock?</h3>
              <p className="text-gray-500 font-medium">While SmartWhip is our most popular brand, we also stock FastGas, Cream Deluxe, and GoldWhip 640g cylinders for delivery across {townData.admin_name}.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
              <h3 className="font-black uppercase tracking-tight text-gray-900 mb-4 text-lg">Are there any delivery charges?</h3>
              <p className="text-gray-500 font-medium">We offer competitive local delivery rates in {townData.city}. Contact us for an exact quote based on your specific postcode.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
              <h3 className="font-black uppercase tracking-tight text-gray-900 mb-4 text-lg">Is it wholesale only?</h3>
              <p className="text-gray-500 font-medium">No, we cater to both retail and wholesale customers. Whether you need a single 640g tank or a full pallet, we have you covered.</p>
            </div>
          </div>
        </section>

        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 blur-[150px] rounded-full opacity-20 -mr-48 -mt-48" />
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-6">Ready to upgrade?</h2>
          <p className="text-gray-400 font-medium max-w-xl mx-auto mb-10">
            Our {townData.city} team is standing by. All orders are handled with total discretion and speed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-12 h-16 text-sm font-black uppercase tracking-widest transition-all">
              <Link href="/">Return to Map</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-orange-500" />
            <span className="ml-2 text-sm font-black text-gray-900 uppercase tracking-tighter italic">ApexWhips</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">© 2026 APEXWHIPS {townData.city.toUpperCase()} HUB</p>
        </div>
      </footer>
    </div>
  );
}
