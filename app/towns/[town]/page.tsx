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
  const baseUrl = process.env.BASE_URL || 'https://apexwhips.com';
  
  return {
    title: `Smartwhip in ${cityName} | Buy Smartwhip ${cityName} - ApexWhips`,
    description: `Get Smartwhip in ${cityName}. Fast delivery of Smartwhips, Flake, and Fastgas in ${cityName}. Buy Smartwhip for sale in ${cityName} today with rapid dispatch.`,
    alternates: {
      canonical: `/towns/${town}`,
    },
    keywords: [
      `Smartwhip in ${cityName}`,
      `ballon in ${cityName}`,
      `flake in ${cityName}`,
      `${cityName} smartwhip`,
      `${cityName} flake`,
      `Fastgas in ${cityName}`,
      `smartwhips for sale in ${cityName}`,
      `buy smartwhip in ${cityName}`
    ]
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
    '@type': 'LocalBusiness',
    name: `ApexWhips ${townData.city}`,
    description: `Premium automotive SmartWhip delivery in ${townData.city}`,
    url: `${process.env.BASE_URL || 'https://apexwhips.com'}/towns/${town}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: townData.city,
      addressRegion: townData.admin_name,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: townData.lat,
      longitude: townData.lng,
    },
  };

  const products = [
    {
      id: 'single',
      name: 'SmartWhip',
      subtitle: 'Single CannisterC',
      description: `Medical-grade high-performance smart canister for individual in ${townData.city}.`,
      price: '£30',
      tag: 'Best Seller'
    },
    {
      id: 'case',
      name: 'SmartWhip Case',
      subtitle: '6-Unit Bulk Pack',
      description: `Professional bulk case. Perfect for your parties across ${townData.admin_name}.`,
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
            { icon: Truck, title: "Local Delivery", text: `Same-day dispatch across all ${townData.city} postcodes.` },
            { icon: ShieldCheck, title: "Certified Grade", text: "Highest medical-grade canisters for automotive use." },
            { icon: Clock, title: "Live Support", text: "Direct messaging with our dispatch team 24/7." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <item.icon className="h-8 w-8 text-orange-500 mb-6" />
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">{item.title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

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
