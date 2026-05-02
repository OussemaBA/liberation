import { IPaymentGateway } from '../interfaces/payment-gateway.interface';
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
        userId: string;
        subscriptionId: string | null;
        amount: number;
        currency: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        provider: string;
        providerReference: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
