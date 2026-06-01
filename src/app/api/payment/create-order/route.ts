import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { validateCode, useCode } from '@/lib/discountCodes'

const PRICES: Record<string, number> = {
  classic: 99900,   // ₹999 in paise
  premium: 249900,  // ₹2,499
  luxury: 499900,   // ₹4,999
}

export async function POST(req: NextRequest) {
  try {
    const { slug, tier, discountCode } = await req.json()
    if (!slug || !tier || !PRICES[tier]) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 503 })
    }

    let finalAmount = PRICES[tier]
    let discountApplied = 0

    if (discountCode) {
      const validation = await validateCode(discountCode)
      if (validation.valid && validation.discountPercent) {
        discountApplied = validation.discountPercent
        finalAmount = Math.round(finalAmount * (1 - discountApplied / 100))
        await useCode(discountCode)
      }
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: finalAmount,
      currency: 'INR',
      receipt: `inv_${slug}_${tier}`,
      notes: { slug, tier, discountCode: discountCode ?? '', discountApplied: String(discountApplied) },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      discountApplied,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
