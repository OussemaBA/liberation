import { SubscriptionService } from '../services/subscription.service';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    getPacks(): Promise<{
        id: string;
        name: string;
        duration: number;
        price: number;
        description: string | null;
    }[]>;
    subscribe(req: any, body: {
        packId: string;
    }): Promise<{
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        packId: string;
        startDate: Date;
        endDate: Date;
        amount: number;
    }>;
    getCurrent(req: any): Promise<{
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        packId: string;
        startDate: Date;
        endDate: Date;
        amount: number;
    } | null>;
}
