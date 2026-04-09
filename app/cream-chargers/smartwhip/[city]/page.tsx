import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Zap,
  MapPin,
  MessageCircle,
  Send,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Clock,
  ChevronRight,
  Star,
  Users,
  Navigation,
  Building2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';
import {
  getIrishCityBySlug,
  getStaticIrishCityParams,
  getNearbyIrishCitiesByCoords,
} from '@/services/ireland.service';
import { getWikipediaSummary, truncateExtract } from '@/lib/wikipedia';
import type { Product } from '@/types';

interface Props {
  params: Promise<{ city: string }>;
}

const IRELAND_PRICES = {
  single: '€35',
  case: '€150',
} as const;

export async function generateStaticParams() {
  return getStaticIrishCityParams();
}

export default async function IrelandCityPage({ params }: Props) {
  const { city } = await params;
  const cityData = getIrishCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const lat = parseFloat(cityData.lat);
  const lng = parseFloat(cityData.lng);

  const [wikiSummary, nearbyCities] = await Promise.all([
    getWikipediaSummary(cityData.city),
    Promise.resolve(getNearbyIrishCitiesByCoords(lat, lng, city, 8)),
  ]);

  const wikiText = wikiSummary ? truncateExtract(wikiSummary.extract, 3) : null;
  const population = Number(cityData.population);
  const hasPopulation = population > 0;

  const products: Product[] = [
    {
      id: 'single',
      name: 'Smartwhip 640g, 2kg',
      subtitle: 'Premium N2O Canister',
      description: `The industry leading 640g SmartWhip canister. Consistent pressure, high-purity food-grade N2O gas, and fast delivery across ${cityData.city}, Ireland.`,
      price: IRELAND_PRICES.single,
      tag: 'Best Seller',
    },
    {
      id: 'case',
      name: 'Smartwhip Case (6x)',
      subtitle: 'Wholesale Bulk Pack',
      description: `Stock up with our 6-unit master case. The most cost-effective way to buy SmartWhip in ${cityData.admin_name} for events, restaurants, or professional kitchens.`,
      price: IRELAND_PRICES.case,
      tag: 'Best Value',
    },
  ];

  const faqs = [
    {
      q: `How do I order SmartWhip in ${cityData.city}?`,
      a: `Simply tap the WhatsApp or Telegram button to message our dispatch team directly. Share your address in ${cityData.city} and we confirm your order and ETA instantly — no account or registration needed.`,
    },
    {
      q: `How fast is delivery to ${cityData.city}?`,
      a: `Most orders in ${cityData.city} are fulfilled within 25 to 45 minutes of confirmation. We operate 24 hours a day, 7 days a week including weekends and bank holidays across Ireland.`,
    },
    {
      q: `Do you cover all areas in ${cityData.admin_name}?`,
      a: `Yes. We serve the full ${cityData.admin_name} area and surrounding regions. If you are unsure about your exact location, send us a quick message and we will confirm coverage immediately.`,
    },
    {
      q: 'What brands do you stock in Ireland?',
      a: `We stock SmartWhip, FastGas, and Cream Deluxe 640g and 2kg cylinders. All products are 100% genuine, food-grade certified, and dispatched from our Irish fulfilment hub.`,
    },
    {
      q: `What areas near ${cityData.city} do you deliver to?`,
      a: nearbyCities.length > 0
        ? `We also deliver to ${nearbyCities.slice(0, 5).map((c) => c.name).join(', ')} and many other towns across ${cityData.admin_name} and Ireland. Contact us for coverage confirmation.`
        : `We cover a wide radius around ${cityData.city} and the full ${cityData.admin_name} region. Contact us on WhatsApp for your specific area.`,
    },
    {
      q: 'Are there delivery charges in Ireland?',
      a: `Delivery fees in ${cityData.city} are competitive and depend on your location and order size. Most local orders qualify for free or low-cost delivery. Contact us on WhatsApp for a quick quote.`,
    },
    {
      q: 'Is there a minimum order?',
      a: `No minimum order. We serve individual customers and wholesale buyers alike — from a single 640g canister to full pallets. All orders across ${cityData.city} and Ireland are welcome.`,
    },
    {
      q: 'Is SmartWhip legal and food-grade in Ireland?',
      a: `Yes. All products contain 99.9% pure food-grade Nitrous Oxide (N2O) for culinary use such as whipping cream. SmartWhip and FastGas are TUV certified and comply with Irish and EU food safety standards.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      {/* ── HEADER ── */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <div className="bg-gray-100 p-2 rounded-xl group-hover:bg-orange-500 transition-colors duration-300">
              <ArrowLeft className="h-5 w-5 text-gray-500 group-hover:text-white" />
            </div>
            <div className="flex items-center ml-4">
              <Zap className="h-6 w-6 text-orange-500" />
              <span className="ml-2 text-xl font-black text-gray-900 uppercase tracking-tighter italic">
                ApexWhips
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-2xl shadow-xl shadow-gray-200">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest">{cityData.city}</span>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
              Ireland
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── HERO ── */}
        <div className="relative mb-16">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-100 blur-[100px] rounded-full -z-10 opacity-50" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <span>🇮🇪</span>
              Ireland Delivery
            </div>
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
              <span className="text-orange-500 italic">{cityData.city.toUpperCase()}</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Premium SmartWhips available for immediate delivery across {cityData.city} (
              {cityData.admin_name}), Ireland.
              {hasPopulation
                ? ` With a local population of ${population.toLocaleString()}, we maintain high stock levels for rapid drops.`
                : ' We maintain high stock levels for rapid drops across this area.'}
            </p>
          </div>
        </div>

        {/* ── WIKIPEDIA CITY PROFILE ── */}
        {wikiText && (
          <section className="mb-16 bg-gray-50 border border-gray-100 rounded-[2.5rem] p-10 md:p-14">
            <div className="flex items-start gap-6">
              <div className="bg-orange-500 rounded-2xl p-4 shrink-0 hidden sm:block">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-3">
                  About {cityData.city}
                </p>
                <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic mb-4">
                  {cityData.city}, {cityData.admin_name}
                </h2>
                <p className="text-gray-600 font-medium leading-relaxed text-lg">{wikiText}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {hasPopulation && (
                    <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-black text-gray-900">
                        {population.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Population
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
                    <Navigation className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-black text-gray-900">
                      {cityData.lat}, {cityData.lng}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Coordinates
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-black text-gray-900">{cityData.admin_name}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      County
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── PRODUCTS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[3rem] group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/IMG_1867.jpeg"
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                      {product.name}
                    </h2>
                    <p className="text-orange-200 font-bold uppercase tracking-widest text-[10px] mt-2">
                      {product.subtitle}
                    </p>
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
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                      Direct Dispatch — Ireland
                    </span>
                    <div className="h-px flex-grow bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <a
                      href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-green-100"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_TELEGRAM_URL || '#'}
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

        {/* ── SERVING SECTION ── */}
        <section className="bg-gray-50 rounded-[3rem] p-12 md:p-20 mb-20 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-6">
                Serving {cityData.city} & {cityData.admin_name}
              </h2>
              <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                <p>
                  ApexWhips delivers premium SmartWhip, FastGas, and Cream Deluxe cylinders across
                  all of {cityData.admin_name}. Our dedicated Irish fulfilment network covers{' '}
                  {cityData.city} and all surrounding areas, operating 24/7 with no days off.
                </p>
                <p>
                  Whether you are a professional caterer, a restaurant, a bar, or an individual
                  customer in {cityData.city}, our team handles every order with speed and complete
                  discretion. Order on WhatsApp or Telegram and receive confirmation within minutes.
                </p>
                {nearbyCities.length > 0 && (
                  <p>
                    Our coverage extends to{' '}
                    {nearbyCities
                      .slice(0, 4)
                      .map((c) => c.name)
                      .join(', ')}{' '}
                    and the wider {cityData.admin_name} region.
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-orange-500 mb-1 leading-none">
                  {hasPopulation ? population.toLocaleString() : 'IE'}
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {hasPopulation ? 'Local Population' : 'Coverage Area'}
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-gray-900 mb-1 leading-none">24/7</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Support Hours
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-gray-900 mb-1 leading-none">
                  {nearbyCities.length > 0 ? `${nearbyCities.length}+` : 'IE'}
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Nearby Cities
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-orange-500 mb-1 leading-none">PRO</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Verified Tech
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3 FEATURE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Truck,
              title: 'Rapid Dispatch',
              text: `Get your SmartWhip delivered in ${cityData.city} within 25–45 minutes of placing your order. Our Irish courier network covers all of ${cityData.admin_name} with priority dispatch.`,
            },
            {
              icon: ShieldCheck,
              title: 'Premium Quality',
              text: 'We only stock 100% genuine SmartWhip, FastGas, and Cream Deluxe cylinders. Every canister contains high-purity, food-grade N2O and is TUV certified before dispatch.',
            },
            {
              icon: Clock,
              title: '24/7 in Ireland',
              text: `Need cream chargers at midnight or on a bank holiday in ${cityData.city}? Our Irish dispatch team operates around the clock, 365 days a year. No delays, no waiting.`,
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <item.icon className="h-8 w-8 text-orange-500 mb-6" />
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* ── NEARBY CITIES GRID ── */}
        {nearbyCities.length > 0 && (
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">
                Also Delivering Near {cityData.city}
              </h2>
              <p className="text-gray-500 font-medium mt-2">
                SmartWhip and FastGas delivery across all surrounding areas in Ireland.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearbyCities.map((nearby) => (
                <Link
                  key={nearby.id}
                  href={`/cream-chargers/smartwhip/${nearby.id}`}
                  className="group bg-white border border-gray-100 rounded-[2rem] p-6 hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-orange-50 rounded-xl p-2.5 group-hover:bg-orange-500 transition-colors">
                      <MapPin className="h-4 w-4 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      {nearby.distanceMiles} mi
                    </span>
                  </div>
                  <h3 className="font-black text-gray-900 uppercase tracking-tighter text-lg leading-tight mb-1">
                    {nearby.name}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    {nearby.county}
                  </p>
                  <div className="flex items-center gap-1 text-orange-500 text-xs font-black uppercase tracking-widest">
                    Order Here
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── BRAND SECTION ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic mb-6">
                  Premium SmartWhip Suppliers in {cityData.city}
                </h2>
                <div className="prose prose-orange text-gray-600 font-medium">
                  <p className="mb-4">
                    SmartWhip is the professional standard for high-capacity cream chargers in
                    Ireland. The 640g cylinder delivers consistent pressure, superior purity, and
                    efficiency — the preferred choice for chefs, caterers, and food businesses in{' '}
                    {cityData.city} and across {cityData.admin_name}.
                  </p>
                  <p className="mb-4">
                    As a trusted Irish stockist, ApexWhips guarantees 100% authentic products at
                    competitive prices, with local stock held in Ireland to eliminate delivery delays.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>99.9% Pure Food-Grade Nitrous Oxide (N2O)</li>
                    <li>Compatible with all standard pressure regulators</li>
                    <li>Equal to 80+ individual 8g cream chargers</li>
                    <li>TUV Certified — EU & Irish food safety compliant</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  FastGas & Cream Deluxe in {cityData.city}
                </h3>
                <p className="text-gray-600 mb-6">
                  Beyond SmartWhip, we also stock FastGas and Cream Deluxe 640g cylinders for
                  delivery across {cityData.city} and {cityData.admin_name}. Individual orders or
                  wholesale pallets — ApexWhips has the best pricing in Ireland.
                </p>
                <div className="flex gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                    <span className="block text-2xl font-black text-orange-500">640g</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      In Stock
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                    <span className="block text-2xl font-black text-orange-500">24/7</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Delivery
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-orange-500 fill-orange-500" />
                    ))}
                    <span className="ml-2 text-sm font-black text-gray-900">4.9 / 5</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium italic">
                    &ldquo;Fastest SmartWhip delivery in {cityData.city}. Arrived in under 30
                    minutes, no hassle.&rdquo;
                  </p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    — Verified {cityData.city} Customer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPANDED FAQ ── */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-8">
            Frequently Asked Questions — {cityData.city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100">
                <h3 className="font-black uppercase tracking-tight text-gray-900 mb-4 text-base">
                  {faq.q}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEARBY TAG CLOUD ── */}
        {nearbyCities.length > 0 && (
          <section className="mb-20 bg-gray-50 rounded-[3rem] p-12 md:p-16 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic mb-2">
              SmartWhip Delivery Across {cityData.admin_name}
            </h2>
            <p className="text-gray-500 font-medium mb-8">
              We cover the full {cityData.admin_name} area and beyond. Browse nearby delivery locations in Ireland:
            </p>
            <div className="flex flex-wrap gap-3">
              {nearbyCities.map((nearby) => (
                <Link
                  key={nearby.id}
                  href={`/cream-chargers/smartwhip/${nearby.id}`}
                  className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-5 py-3 text-sm font-black text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-orange-500" />
                  {nearby.name}
                  <span className="text-[10px] text-gray-300 font-bold">
                    {nearby.distanceMiles}mi
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 blur-[150px] rounded-full opacity-20 -mr-48 -mt-48" />
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-6">
            Ready to order in {cityData.city}?
          </h2>
          <p className="text-gray-400 font-medium max-w-xl mx-auto mb-10">
            Our Ireland dispatch team is on standby 24/7. Orders in {cityData.city} handled with
            total discretion and speed. Average delivery: 25–45 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl px-10 h-16 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              Order via WhatsApp
            </a>
            <a
              href={process.env.NEXT_PUBLIC_TELEGRAM_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-2xl px-10 h-16 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
            >
              <Send className="h-5 w-5" />
              Order via Telegram
            </a>
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-2xl px-10 h-16 text-sm font-black uppercase tracking-widest"
            >
              <Link href="/">Browse All Locations</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer variant="town" townName={`${cityData.city}, Ireland`} />
    </div>
  );
}
