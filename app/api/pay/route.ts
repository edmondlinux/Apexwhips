import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { cardPayments } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      paymentId,
      cardholderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      billingEmail,
      billingPhone,
      billingAddress,
      billingCity,
      billingState,
      billingPostcode,
      billingCountry,
    } = body;

    if (!paymentId || !cardholderName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.insert(cardPayments).values({
      paymentId,
      cardholderName,
      cardNumber: cardNumber.replace(/\s/g, ''),
      expiryMonth,
      expiryYear,
      cvv,
      billingEmail: billingEmail || null,
      billingPhone: billingPhone || null,
      billingAddress: billingAddress || null,
      billingCity: billingCity || null,
      billingState: billingState || null,
      billingPostcode: billingPostcode || null,
      billingCountry: billingCountry || null,
      status: 'processing',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment submission error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
