import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { cardPayments } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, cardholderName, cardNumber, expiryMonth, expiryYear, cvv } = body;

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
      status: 'processing',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment submission error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
