import { CheckoutSession, Transaction } from '@/types';

export class BillingService {
  static async createCheckoutSession(token: string, data: { packId: string; amount: number; successUrl: string; cancelUrl: string }): Promise<CheckoutSession> {
    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate checkout');
    }

    return response.json();
  }

  static async verifyPayment(token: string, reference: string): Promise<Transaction | null> {
    const response = await fetch(`/api/payments/verify?reference=${reference}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return response.json();
  }
}
