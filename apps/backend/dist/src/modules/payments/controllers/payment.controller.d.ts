import { PaymentService } from '../services/payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createSession(req: any, body: any): Promise<import("../interfaces/payment-gateway.interface").PaymentSessionResponse>;
    verify(reference: string): Promise<{
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
