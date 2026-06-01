'use client'

import { useState } from 'react'
import DiscountCodeInput from './DiscountCodeInput'

interface Props {
  slug: string
  currentTier: 'classic' | 'premium' | 'luxury'
  accentColor?: string
}

const UPGRADE_OPTIONS = [
  {
    tier: 'premium' as const,
    name: 'Premium',
    price: '₹2,499',
    color: '#A16207',
    features: ['No watermark', 'Custom slug', 'Custom colors & fonts', 'Password protection', 'Music', 'Photos', 'RSVP emails', '1 year validity'],
  },
  {
    tier: 'luxury' as const,
    name: 'Luxury',
    price: '₹4,999',
    color: '#7C3AED',
    features: ['Everything in Premium', 'White-label', 'Priority support', 'Custom tweaks', '2 year validity'],
  },
]

declare global {
  interface Window { Razorpay: any }
}

export default function UpgradeButton({ slug, currentTier, accentColor = '#A16207' }: Props) {
  const [loading, setLoading] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [appliedCode, setAppliedCode] = useState<string | undefined>()
  const [appliedDiscount, setAppliedDiscount] = useState<number | undefined>()

  async function upgrade(tier: 'premium' | 'luxury') {
    setLoading(tier)
    try {
      // Create order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, tier, discountCode: appliedCode }),
      })
      const order = await orderRes.json()
      if (!order.orderId) throw new Error('Order creation failed')

      // Load Razorpay script
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Razorpay'))
          document.head.appendChild(script)
        })
      }

      // Open Razorpay checkout
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          order_id: order.orderId,
          name: 'Invitely',
          description: `Upgrade to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
          theme: { color: accentColor },
          handler: async (response: any) => {
            // Verify payment
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                slug,
                tier,
              }),
            })
            const result = await verifyRes.json()
            if (result.success) {
              setSuccess(true)
              resolve()
              // Redirect to success page after short delay
              setTimeout(() => window.location.href = '/payment-success', 1500)
            } else {
              reject(new Error('Payment verification failed'))
            }
          },
          modal: { ondismiss: () => reject(new Error('Payment cancelled')) },
        })
        rzp.open()
      })
    } catch (err) {
      // Payment cancelled or failed — silently reset
    } finally {
      setLoading(null)
    }
  }

  if (success) {
    return (
      <div className="border border-[#16A34A] border-opacity-40 p-4 text-center">
        <p className="text-[#16A34A] text-sm font-semibold">✓ Upgrade successful! Refresh to see your new features.</p>
      </div>
    )
  }

  if (currentTier !== 'classic') return null // already upgraded

  return (
    <div className="space-y-3">
      <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-3">Upgrade This Invite</p>

      {/* Discount code */}
      <DiscountCodeInput
        appliedCode={appliedCode}
        appliedDiscount={appliedDiscount}
        onApply={(code, pct) => { setAppliedCode(code); setAppliedDiscount(pct) }}
        onRemove={() => { setAppliedCode(undefined); setAppliedDiscount(undefined) }}
        accentColor={accentColor}
      />

      {UPGRADE_OPTIONS.map(opt => {
        const discountedPrice = appliedDiscount
          ? Math.round(parseInt(opt.price.replace(/[₹,]/g, '')) * (1 - appliedDiscount / 100))
          : null
        return (
          <div key={opt.tier} className="border border-white/5 p-4 bg-[#111009]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-sm" style={{ color: opt.color }}>
                  {opt.name} —{' '}
                  {discountedPrice ? (
                    <>
                      <span className="line-through opacity-40">{opt.price}</span>
                      {' '}₹{discountedPrice.toLocaleString('en-IN')}
                    </>
                  ) : opt.price}
                </p>
                <p className="text-[#FAFAF9] opacity-30 text-xs mt-0.5">{opt.features.slice(0, 3).join(' · ')}</p>
              </div>
              <button
                onClick={() => upgrade(opt.tier)}
                disabled={loading !== null}
                className="flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase font-semibold transition-all disabled:opacity-40"
                style={{ background: opt.color, color: '#0C0A09' }}
              >
                {loading === opt.tier ? 'Processing...' : 'Upgrade'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
