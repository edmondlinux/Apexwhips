'use client';

import { useState, useRef, useCallback } from 'react';
import { MapPin, Clock, ChevronRight, Upload, CheckCircle, X, Package, CreditCard, Banknote } from 'lucide-react';

const BRANDS = [
  {
    id: 'smartwhip',
    name: 'Smartwhip',
    description: '640g Premium N2O Canister',
    color: 'from-blue-600 to-blue-800',
    accent: 'bg-blue-50 border-blue-200 text-blue-700',
    badge: 'Most Popular',
  },
  {
    id: 'cream-deluxe',
    name: 'Cream Deluxe',
    description: '640g Professional Grade',
    color: 'from-purple-600 to-purple-800',
    accent: 'bg-purple-50 border-purple-200 text-purple-700',
    badge: 'Premium',
  },
  {
    id: 'fastgas',
    name: 'FastGas',
    description: '640g High-Purity N2O',
    color: 'from-orange-500 to-red-600',
    accent: 'bg-orange-50 border-orange-200 text-orange-700',
    badge: 'Fast Dispatch',
  },
] as const;

type BrandId = typeof BRANDS[number]['id'];
type VariantId = 'unit' | 'box';
type Step = 'select' | 'location' | 'checkout' | 'upload' | 'done';

interface LocationData {
  display: string;
  lat: number;
  lng: number;
}

interface CheckoutFlowProps {
  city: string;
  whatsappUrl: string;
}

export function CheckoutFlow({ city, whatsappUrl }: CheckoutFlowProps) {
  const [step, setStep] = useState<Step>('select');
  const [selectedBrand, setSelectedBrand] = useState<BrandId | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariantId | null>(null);
  const [address, setAddress] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const unitPrice = '£30';
  const boxPrice = '£130';

  const selectedBrandData = BRANDS.find((b) => b.id === selectedBrand);

  const geocodeAddress = useCallback(async (query: string) => {
    setIsGeocoding(true);
    setGeocodeError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', UK')}&format=json&limit=1&countrycodes=gb`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setLocationData({
          display: data[0].display_name,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
        setStep('location');
      } else {
        setGeocodeError('Location not found. Please try a different postcode or address.');
      }
    } catch {
      setGeocodeError('Could not find location. Please check your postcode and try again.');
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    geocodeAddress(address.trim());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const url = URL.createObjectURL(file);
      setScreenshotPreview(url);
    }
  };

  const handleConfirmPayment = () => {
    if (!screenshot) return;
    setStep('done');
    setTimeout(() => {
      window.open(whatsappUrl || 'https://wa.me/', '_blank');
    }, 1500);
  };

  const resetFlow = () => {
    setStep('select');
    setSelectedBrand(null);
    setSelectedVariant(null);
    setAddress('');
    setLocationData(null);
    setGeocodeError('');
    setScreenshot(null);
    setScreenshotPreview(null);
  };

  const bankName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || 'ApexWhips Ltd';
  const sortCode = process.env.NEXT_PUBLIC_BANK_SORT_CODE || '00-00-00';
  const accountNumber = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || '00000000';

  const orderTotal = selectedVariant === 'box' ? boxPrice : unitPrice;

  return (
    <div className="mb-20">
      <div className="mb-10">
        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">
          Order Now
        </p>
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">
          Select Your Product
        </h2>
        <p className="text-gray-500 font-medium mt-2">
          Fast same-day delivery in {city}. ETA 20–25 minutes.
        </p>
      </div>

      {/* Step: Brand + Variant Selection */}
      {step === 'select' && (
        <div className="space-y-8">
          {/* Pricing Summary */}
          <div className="flex flex-wrap gap-4 mb-2">
            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm">
              <Package className="h-5 w-5 text-orange-500" />
              <div>
                <span className="text-2xl font-black text-gray-900">£30</span>
                <span className="text-xs font-bold text-gray-400 ml-2 uppercase tracking-widest">Per Unit</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-orange-500 rounded-2xl px-6 py-4 shadow-xl shadow-orange-100">
              <Package className="h-5 w-5 text-white" />
              <div>
                <span className="text-2xl font-black text-white">£130</span>
                <span className="text-xs font-bold text-orange-200 ml-2 uppercase tracking-widest">Per Box (Balloons Incl.)</span>
              </div>
            </div>
          </div>

          {/* Brand Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`group relative text-left rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  selectedBrand === brand.id
                    ? 'ring-4 ring-orange-400 shadow-2xl shadow-orange-100 scale-[1.02]'
                    : 'hover:shadow-xl hover:shadow-gray-200/60 border border-gray-100 shadow-sm'
                }`}
              >
                <div className={`h-28 bg-gradient-to-br ${brand.color} flex items-center justify-center relative`}>
                  <span className="text-4xl font-black text-white/20 absolute right-4 bottom-2 italic uppercase tracking-tighter leading-none">
                    {brand.name.split(' ')[0]}
                  </span>
                  <div className="z-10 text-center px-4">
                    <span className="text-white font-black text-xl italic uppercase tracking-tighter">
                      {brand.name}
                    </span>
                  </div>
                  {selectedBrand === brand.id && (
                    <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    </div>
                  )}
                </div>
                <div className="bg-white p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{brand.description}</p>
                  <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${brand.accent}`}>
                    {brand.badge}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Variant Selection */}
          {selectedBrand && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">
                Choose your quantity
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedVariant('unit')}
                  className={`text-left p-6 rounded-[1.5rem] border-2 transition-all duration-200 ${
                    selectedVariant === 'unit'
                      ? 'border-orange-400 bg-orange-50 shadow-lg shadow-orange-100'
                      : 'border-gray-100 bg-white hover:border-orange-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-black text-gray-900 uppercase tracking-tight">Single Unit</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{selectedBrandData?.name} 640g Canister</p>
                    </div>
                    {selectedVariant === 'unit' && <CheckCircle className="h-5 w-5 text-orange-500 shrink-0" />}
                  </div>
                  <p className="text-3xl font-black text-gray-900">£30</p>
                </button>
                <button
                  onClick={() => setSelectedVariant('box')}
                  className={`text-left p-6 rounded-[1.5rem] border-2 transition-all duration-200 relative overflow-hidden ${
                    selectedVariant === 'box'
                      ? 'border-orange-400 bg-orange-50 shadow-lg shadow-orange-100'
                      : 'border-gray-100 bg-white hover:border-orange-200 hover:shadow-md'
                  }`}
                >
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                    Best Value
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-black text-gray-900 uppercase tracking-tight">Full Box</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Balloons included</p>
                    </div>
                    {selectedVariant === 'box' && <CheckCircle className="h-5 w-5 text-orange-500 shrink-0" />}
                  </div>
                  <p className="text-3xl font-black text-gray-900">£130</p>
                </button>
              </div>
            </div>
          )}

          {/* Address Input */}
          {selectedBrand && selectedVariant && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">
                Enter your delivery location
              </p>
              <form onSubmit={handleAddressSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter postcode or address…"
                    className="w-full pl-12 pr-4 py-5 rounded-2xl border border-gray-200 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!address.trim() || isGeocoding}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-gray-200 whitespace-nowrap"
                >
                  {isGeocoding ? (
                    <span className="animate-pulse">Finding…</span>
                  ) : (
                    <>Confirm <ChevronRight className="h-4 w-4" /></>
                  )}
                </button>
              </form>
              {geocodeError && (
                <p className="mt-3 text-sm text-red-500 font-medium">{geocodeError}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step: Location Bottom Sheet */}
      {step === 'location' && locationData && (
        <div className="fixed inset-0 z-50 flex flex-col">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={resetFlow} />
          <div className="relative mt-auto bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-400">
            {/* Map */}
            <div className="relative h-64 shrink-0">
              <iframe
                title="Delivery Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationData.lng - 0.02},${locationData.lat - 0.02},${locationData.lng + 0.02},${locationData.lat + 0.02}&layer=mapnik&marker=${locationData.lat},${locationData.lng}`}
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/40 pointer-events-none" />
              <button
                onClick={resetFlow}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Info */}
            <div className="p-8 overflow-y-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-orange-500 rounded-2xl p-3 shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1">
                    Delivery Address
                  </p>
                  <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                    {locationData.display}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <div className="flex-1 bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
                  <Clock className="h-5 w-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-gray-900">20–25 min</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ETA</p>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
                  <Package className="h-5 w-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-gray-900">Same-Day</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Your Order</p>
                <p className="font-black text-gray-900">{selectedBrandData?.name} — {selectedVariant === 'box' ? 'Full Box' : 'Single Unit'}</p>
                <p className="text-2xl font-black text-orange-500 mt-1">{orderTotal}</p>
              </div>

              <button
                onClick={() => setStep('checkout')}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-gray-200 flex items-center justify-center gap-2"
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step: Bank Transfer Checkout */}
      {step === 'checkout' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-400 max-h-[90vh] flex flex-col">
            <div className="p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1">Step 2 of 3</p>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Bank Transfer</h3>
                </div>
                <button onClick={resetFlow} className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Order summary */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-6">
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2">Order Total</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-gray-900">{selectedBrandData?.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{selectedVariant === 'box' ? 'Full Box — Balloons Included' : 'Single Unit'}</p>
                  </div>
                  <p className="text-3xl font-black text-gray-900">{orderTotal}</p>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-5">
                  <Banknote className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-black text-white uppercase tracking-widest">Bank Transfer Details</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Account Name', value: bankName },
                    { label: 'Sort Code', value: sortCode },
                    { label: 'Account Number', value: accountNumber },
                    { label: 'Reference', value: `${selectedBrandData?.name?.toUpperCase().replace(' ', '')} ${city.toUpperCase()}` },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                      <span className="font-black text-white text-sm font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-500 font-medium text-center mb-6">
                Transfer exactly <strong className="text-gray-900">{orderTotal}</strong> using the details above, then click below once sent.
              </p>

              <button
                onClick={() => setStep('upload')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-orange-200 flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Mark as Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step: Screenshot Upload */}
      {step === 'upload' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-400 max-h-[90vh] flex flex-col">
            <div className="p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1">Step 3 of 3</p>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Upload Proof</h3>
                </div>
                <button onClick={resetFlow} className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <p className="text-sm text-gray-500 font-medium mb-6">
                Upload a screenshot of your bank transfer confirmation to verify your payment. Your order will be dispatched immediately after verification.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {screenshotPreview ? (
                <div className="relative mb-6 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={screenshotPreview}
                    alt="Payment proof"
                    className="w-full object-contain max-h-56"
                  />
                  <button
                    onClick={() => { setScreenshot(null); setScreenshotPreview(null); }}
                    className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-orange-300 rounded-2xl p-10 flex flex-col items-center gap-4 transition-colors mb-6 group"
                >
                  <div className="bg-gray-100 group-hover:bg-orange-50 rounded-full p-4 transition-colors">
                    <Upload className="h-6 w-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-gray-700 text-sm">Tap to upload screenshot</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">PNG, JPG — bank transfer confirmation</p>
                  </div>
                </button>
              )}

              {!screenshotPreview && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors mb-4"
                >
                  Choose File
                </button>
              )}

              <button
                disabled={!screenshot}
                onClick={handleConfirmPayment}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-gray-200 flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Confirm & Contact on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step: Done */}
      {step === 'done' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-sm mx-4 text-center animate-in zoom-in duration-300">
            <div className="bg-green-100 rounded-full p-5 inline-flex mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic mb-3">
              Payment Received!
            </h3>
            <p className="text-gray-500 font-medium text-sm mb-2">
              Redirecting you to WhatsApp to complete your order…
            </p>
            <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 animate-[progress_1.5s_ease-in-out_forwards] rounded-full" style={{ width: '100%', animation: 'none', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 1.5s ease-in-out', willChange: 'transform' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
