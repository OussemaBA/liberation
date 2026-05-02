export interface PaymentSessionResponse {
  id: string;
  url: string;
}

export interface IPaymentGateway {
  createCheckoutSession(data: {
    amount: number;
    currency: string;
    description: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: any;
  }): Promise<PaymentSessionResponse>;

  verifyPayment(reference: string): Promise<boolean>;
}
