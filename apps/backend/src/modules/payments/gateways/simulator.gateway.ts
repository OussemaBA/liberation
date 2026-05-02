import { Injectable } from '@nestjs/common';
import { IPaymentGateway, PaymentSessionResponse } from '../interfaces/payment-gateway.interface';

@Injectable()
export class SimulatorGateway implements IPaymentGateway {
  async createCheckoutSession(data: any): Promise<PaymentSessionResponse> {
    const mockId = `sim_${Math.random().toString(36).substring(7)}`;
    return {
      id: mockId,
      url: `${data.successUrl}?session_id=${mockId}`,
    };
  }

  async verifyPayment(reference: string): Promise<boolean> {
    return reference.startsWith('sim_');
  }
}
