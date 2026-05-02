import { IPaymentGateway, PaymentSessionResponse } from '../interfaces/payment-gateway.interface';
export declare class SimulatorGateway implements IPaymentGateway {
    createCheckoutSession(data: any): Promise<PaymentSessionResponse>;
    verifyPayment(reference: string): Promise<boolean>;
}
