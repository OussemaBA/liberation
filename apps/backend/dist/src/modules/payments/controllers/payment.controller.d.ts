import { PaymentService } from '../services/payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createSession(req: any, body: any): Promise<import("../interfaces/payment-gateway.interface").PaymentSessionResponse>;
    verify(reference: string): Promise<{
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
