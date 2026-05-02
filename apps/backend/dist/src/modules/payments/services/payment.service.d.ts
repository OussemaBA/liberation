import type { IPaymentGateway } from '../interfaces/payment-gateway.interface';
import { PaymentRepository } from '../repositories/payment.repository';
export declare class PaymentService {
    private readonly gateway;
    private readonly paymentRepository;
    constructor(gateway: IPaymentGateway, paymentRepository: PaymentRepository);
    initiateCheckout(userId: string, data: {
        packId: string;
        amount: number;
        successUrl: string;
        cancelUrl: string;
    }): Promise<import("../interfaces/payment-gateway.interface").PaymentSessionResponse>;
    verifyTransaction(reference: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        amount: number;
        subscriptionId: string | null;
        currency: string;
        provider: string;
        providerReference: string | null;
    } | null>;
}
