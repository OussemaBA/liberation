import { Pack, Subscription } from '@/types';

export class SubscriptionService {
  static async findAllPacks(): Promise<Pack[]> {
    const response = await fetch('/api/subscriptions/packs');
    if (!response.ok) throw new Error('Failed to fetch packs');
    return response.json();
  }

  static async findCurrent(token: string): Promise<Subscription | null> {
    const response = await fetch('/api/subscriptions/current', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch current subscription');
    return response.json();
  }

  static async subscribe(token: string, packId: string): Promise<Subscription> {
    const response = await fetch('/api/subscriptions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ packId }),
    });
    if (!response.ok) throw new Error('Subscription failed');
    return response.json();
  }
}
